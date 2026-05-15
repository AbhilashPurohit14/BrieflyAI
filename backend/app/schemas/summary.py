"""Summary request/response schemas."""
from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime


class SummarizeTextRequest(BaseModel):
    text: str = Field(..., min_length=50, max_length=50000)
    length: str = Field(default="medium", pattern="^(short|medium|detailed)$")
    bullet_mode: bool = False


class SummarizeURLRequest(BaseModel):
    url: str = Field(..., min_length=10)
    length: str = Field(default="medium", pattern="^(short|medium|detailed)$")
    bullet_mode: bool = False


class ArticleMetadata(BaseModel):
    title: str | None = None
    author: str | None = None
    publish_date: str | None = None
    source_url: str | None = None


class SummaryAnalytics(BaseModel):
    sentiment: str
    sentiment_score: float
    keywords: list[str]
    readability_score: float
    original_word_count: int
    summary_word_count: int
    reading_time_saved: int  # seconds
    confidence_score: float


class SummarizeResponse(BaseModel):
    id: str | None = None
    summary: str
    headline: str | None = None
    key_points: list[str]
    bullet_summary: str | None = None
    analytics: SummaryAnalytics
    metadata: ArticleMetadata | None = None
    created_at: datetime | None = None

    model_config = {"from_attributes": True}


class HistoryItem(BaseModel):
    id: str
    title: str | None = None
    summary_text: str
    source_type: str
    source_url: str | None = None
    summary_length: str
    original_word_count: int | None = None
    is_favorite: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class HistoryListResponse(BaseModel):
    items: list[HistoryItem]
    total: int
    page: int
    per_page: int
