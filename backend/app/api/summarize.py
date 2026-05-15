"""Summarization API endpoints."""
import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.summary import (
    SummarizeTextRequest,
    SummarizeURLRequest,
    SummarizeResponse,
    SummaryAnalytics,
    ArticleMetadata,
)
from app.services.model_service import model_service
from app.services import nlp_service, article_extractor
from app.services.auth_service import decode_token
from app.database import get_db
from app.models.summary import Summary

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/summarize", tags=["summarize"])


async def _get_optional_user(authorization: str | None = Header(None)) -> str | None:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if payload:
        return payload.get("sub")
    return None


def _build_response(
    text: str,
    summary: str,
    length: str,
    bullet_mode: bool,
    metadata: ArticleMetadata | None = None,
    user_id: str | None = None,
    db_id: str | None = None,
) -> SummarizeResponse:
    """Build a full summarization response with analytics."""
    # NLP analysis
    sentiment_label, sentiment_score = nlp_service.analyze_sentiment(text)
    keywords = nlp_service.extract_keywords(text)
    readability = nlp_service.calculate_readability(text)
    key_points = nlp_service.extract_key_points(text)
    headline = nlp_service.generate_headline(text, summary)
    
    original_words = len(text.split())
    summary_words = len(summary.split())
    original_reading_time = nlp_service.estimate_reading_time(original_words)
    summary_reading_time = nlp_service.estimate_reading_time(summary_words)
    time_saved = max(0, original_reading_time - summary_reading_time)
    confidence = nlp_service.calculate_confidence(original_words, summary_words)
    
    bullet_summary = nlp_service.create_bullet_summary(key_points) if bullet_mode else None

    analytics = SummaryAnalytics(
        sentiment=sentiment_label,
        sentiment_score=sentiment_score,
        keywords=keywords,
        readability_score=readability,
        original_word_count=original_words,
        summary_word_count=summary_words,
        reading_time_saved=time_saved,
        confidence_score=confidence,
    )

    return SummarizeResponse(
        id=db_id,
        summary=summary,
        headline=headline,
        key_points=key_points,
        bullet_summary=bullet_summary,
        analytics=analytics,
        metadata=metadata,
    )


@router.post("/text", response_model=SummarizeResponse)
async def summarize_text(
    request: SummarizeTextRequest,
    user_id: str | None = Depends(_get_optional_user),
    db: AsyncSession = Depends(get_db)
):
    """Summarize raw text input."""
    if not model_service.is_loaded:
        raise HTTPException(status_code=503, detail="Model is not loaded yet. Please wait.")

    try:
        summary = model_service.summarize(
            text=request.text,
            length=request.length,
        )
        
        db_id = None
        if user_id:
            db_summary = Summary(
                user_id=user_id,
                title="Text Summary",
                original_text=request.text,
                summary_text=summary,
                source_type="text",
                summary_length=request.length,
                original_word_count=len(request.text.split())
            )
            db.add(db_summary)
            await db.commit()
            await db.refresh(db_summary)
            db_id = db_summary.id

        return _build_response(
            text=request.text,
            summary=summary,
            length=request.length,
            bullet_mode=request.bullet_mode,
            db_id=db_id,
        )
    except Exception as e:
        logger.error(f"Summarization failed: {e}")
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")


@router.post("/url", response_model=SummarizeResponse)
async def summarize_url(
    request: SummarizeURLRequest,
    user_id: str | None = Depends(_get_optional_user),
    db: AsyncSession = Depends(get_db)
):
    """Extract article from URL and summarize."""
    if not model_service.is_loaded:
        raise HTTPException(status_code=503, detail="Model is not loaded yet.")

    try:
        article = article_extractor.extract_from_url(request.url)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    try:
        summary = model_service.summarize(
            text=article.text,
            length=request.length,
        )
        
        metadata = ArticleMetadata(
            title=article.title,
            author=article.author,
            publish_date=article.publish_date,
            source_url=article.source_url,
        )
        
        db_id = None
        if user_id:
            db_summary = Summary(
                user_id=user_id,
                title=article.title or "URL Summary",
                original_text=article.text,
                summary_text=summary,
                source_type="url",
                source_url=request.url,
                summary_length=request.length,
                original_word_count=len(article.text.split())
            )
            db.add(db_summary)
            await db.commit()
            await db.refresh(db_summary)
            db_id = db_summary.id
        
        return _build_response(
            text=article.text,
            summary=summary,
            length=request.length,
            bullet_mode=request.bullet_mode,
            metadata=metadata,
            db_id=db_id,
        )
    except Exception as e:
        logger.error(f"URL summarization failed: {e}")
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")


@router.post("/file", response_model=SummarizeResponse)
async def summarize_file(
    file: UploadFile = File(...),
    length: str = Form(default="medium"),
    bullet_mode: bool = Form(default=False),
    user_id: str | None = Depends(_get_optional_user),
    db: AsyncSession = Depends(get_db)
):
    """Upload a file (.txt, .pdf, .docx) and summarize its content."""
    if not model_service.is_loaded:
        raise HTTPException(status_code=503, detail="Model is not loaded yet.")

    # Validate file size (10MB max)
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10MB.")

    # Validate extension
    filename = file.filename or "file"
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    
    try:
        if ext == ".pdf":
            article = article_extractor.extract_from_pdf(content, filename)
        elif ext == ".docx":
            article = article_extractor.extract_from_docx(content, filename)
        elif ext == ".txt":
            article = article_extractor.extract_from_txt(content, filename)
        else:
            raise HTTPException(
                status_code=415,
                detail=f"Unsupported file type: {ext}. Supported: .txt, .pdf, .docx"
            )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    try:
        summary = model_service.summarize(
            text=article.text,
            length=length,
        )
        
        metadata = ArticleMetadata(title=article.title)
        
        db_id = None
        if user_id:
            db_summary = Summary(
                user_id=user_id,
                title=article.title or filename or "File Summary",
                original_text=article.text,
                summary_text=summary,
                source_type=ext.replace(".", "") if ext else "file",
                summary_length=length,
                original_word_count=len(article.text.split())
            )
            db.add(db_summary)
            await db.commit()
            await db.refresh(db_summary)
            db_id = db_summary.id
        
        return _build_response(
            text=article.text,
            summary=summary,
            length=length,
            bullet_mode=bullet_mode,
            metadata=metadata,
            db_id=db_id,
        )
    except Exception as e:
        logger.error(f"File summarization failed: {e}")
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")
