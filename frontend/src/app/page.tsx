"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Link2,
  FileUp,
  Sparkles,
  BarChart3,
  Zap,
  BookOpen,
  Shield,
  Clock,
  Brain,
  Layers,
  CheckCircle2,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

/* ---- Animation Variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ---- Rotating Words Component ---- */
function RotatingWords() {
  const words = ["articles", "reports", "documents", "research", "news"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            display: "inline-block",
            color: "var(--accent-primary)",
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---- Feature Card ---- */
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        padding: "32px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-card)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--accent-primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          color: "var(--accent-primary)",
        }}
      >
        <Icon size={22} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "8px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-tertiary)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ---- Step Card ---- */
function StepCard({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        flex: 1,
        textAlign: "center",
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "var(--radius-full)",
          border: "2px solid var(--accent-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          color: "var(--accent-primary)",
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "8px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-tertiary)",
          lineHeight: 1.6,
          maxWidth: "280px",
          margin: "0 auto",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ---- Stat Card ---- */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.5rem",
          color: "var(--accent-primary)",
          lineHeight: 1.1,
          marginBottom: "4px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ====== LANDING PAGE ====== */
export default function LandingPage() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* ---- HERO ---- */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-default)",
            backgroundColor: "var(--bg-card)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--text-tertiary)",
            marginBottom: "32px",
          }}
        >
          <Sparkles size={14} style={{ color: "var(--accent-primary)" }} />
          Powered by fine-tuned T5 on CNN/DailyMail
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-display"
          style={{ marginBottom: "24px" }}
        >
          Summarize your
          <br />
          <RotatingWords /> instantly
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: "1.1875rem",
            color: "var(--text-tertiary)",
            maxWidth: "560px",
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          Read less. Know more. Transform lengthy articles into precise,
          intelligent summaries with our AI-powered platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/summarize"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--accent-primary)",
              color: "#fff",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(59,91,219,0.25)",
            }}
          >
            Summarize Article
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/summarize"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Try Demo
          </Link>
        </motion.div>

        {/* Abstract Product Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            marginTop: "64px",
            maxWidth: "800px",
            margin: "64px auto 0",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)",
            background: "linear-gradient(180deg, var(--bg-card) 0%, var(--bg-secondary) 100%)",
            boxShadow: "0 24px 64px -12px rgba(0,0,0,0.08), 0 0 0 1px var(--border-subtle)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Subtle glow effect behind */}
          <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, var(--accent-primary-light) 0%, transparent 70%)", opacity: 0.5, pointerEvents: "none" }} />
          
          {/* Mac window header */}
          <div style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", backgroundColor: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
            </div>
            <div style={{ margin: "0 auto", fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500, fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>Briefly Engine</div>
            <div style={{ width: "44px" }} /> {/* spacer to balance the dots */}
          </div>

          <div style={{ padding: "48px 40px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
            {/* Raw Document lines shrinking into AI model */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "480px" }}>
              {[100, 85, 92, 78, 95].map((width, i) => (
                <motion.div
                  key={`raw-${i}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: `${width}%` }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                  style={{
                    height: "10px",
                    borderRadius: "5px",
                    backgroundColor: "var(--border-default)",
                  }}
                />
              ))}
            </div>

            {/* AI processing indicator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 0 32px var(--accent-primary-light)",
              }}
            >
              <Sparkles size={24} />
            </motion.div>

            {/* Output Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", maxWidth: "480px" }}>
              {[100, 75].map((width, i) => (
                <div key={`sum-${i}`} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 2.0 + i * 0.2 }}
                    style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-primary)" }}
                  />
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: `${width}%` }}
                    transition={{ duration: 0.6, delay: 2.1 + i * 0.2 }}
                    style={{
                      height: "12px",
                      borderRadius: "6px",
                      background: "linear-gradient(90deg, var(--accent-primary) 0%, #8b5cf6 100%)",
                      opacity: 0.9
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Analytics Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.8 }}
              style={{ display: "flex", gap: "12px", marginTop: "16px" }}
            >
              {["92% Compression", "Sentiments Extracted"].map((label) => (
                 <div key={label} style={{ fontSize: "0.75rem", padding: "6px 14px", borderRadius: "20px", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", fontWeight: 500 }}>
                   {label}
                 </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ---- FEATURES ---- */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-label"
            style={{
              color: "var(--accent-primary)",
              marginBottom: "12px",
            }}
          >
            Features
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-heading-1">
            Everything you need to
            <br />
            summarize smarter
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <FeatureCard
            icon={Link2}
            title="URL Extraction"
            description="Paste any article URL and we'll extract and summarize the content automatically. Works with most news sites and blogs."
            index={0}
          />
          <FeatureCard
            icon={FileUp}
            title="File Upload"
            description="Upload PDF, DOCX, or TXT files directly. Our extraction pipeline handles complex document formats cleanly."
            index={1}
          />
          <FeatureCard
            icon={Layers}
            title="Multiple Lengths"
            description="Choose short, medium, or detailed summaries. Get exactly the level of detail you need for your use case."
            index={2}
          />
          <FeatureCard
            icon={Brain}
            title="Key Points & Headlines"
            description="Auto-extract the most important points and generate concise headlines from any article."
            index={3}
          />
          <FeatureCard
            icon={BarChart3}
            title="Smart Analytics"
            description="Sentiment analysis, readability scores, keyword extraction, and confidence metrics for every summary."
            index={4}
          />
          <FeatureCard
            icon={Zap}
            title="Fast Inference"
            description="Optimized T5 model with beam search and caching delivers results in seconds, not minutes."
            index={5}
          />
        </motion.div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section
        style={{
          backgroundColor: "var(--bg-secondary)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-label"
              style={{ color: "var(--accent-primary)", marginBottom: "12px" }}
            >
              How it works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-heading-1">
              Three steps to clarity
            </motion.h2>
          </motion.div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <StepCard
              number="1"
              title="Paste or Upload"
              description="Drop in your article text, paste a URL, or upload a document. We handle the rest."
              index={0}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--border-default)",
              }}
            >
              <ChevronRight size={24} />
            </div>
            <StepCard
              number="2"
              title="AI Processes"
              description="Our fine-tuned T5 model analyzes structure, extracts key information, and generates a summary."
              index={1}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--border-default)",
              }}
            >
              <ChevronRight size={24} />
            </div>
            <StepCard
              number="3"
              title="Get Results"
              description="Receive your summary with key points, analytics, and confidence metrics. Copy, download, or share."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ---- MODEL ACCURACY ---- */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-label"
            style={{ color: "var(--accent-primary)", marginBottom: "12px" }}
          >
            Model Performance
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-heading-1">
            Trained on real-world data
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            style={{
              maxWidth: "560px",
              margin: "16px auto 0",
              color: "var(--text-tertiary)",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
            }}
          >
            Our T5-small model was fine-tuned on 11,490 articles from the
            CNN/DailyMail dataset with 10 epochs of training, achieving stable
            convergence.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "64px",
            flexWrap: "wrap",
            padding: "40px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <StatCard value="11.5K" label="Training Articles" />
          <StatCard value="10" label="Training Epochs" />
          <StatCard value="1.69" label="Final Val Loss" />
          <StatCard value="T5" label="Model Architecture" />
          <StatCard value="~2s" label="Avg. Inference" />
        </motion.div>
      </section>

      {/* ---- SUPPORTED FORMATS ---- */}
      <section
        style={{
          backgroundColor: "var(--bg-secondary)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-label"
              style={{ color: "var(--accent-primary)", marginBottom: "12px" }}
            >
              Supported Formats
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-heading-1">
              Bring any content
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {[
              { icon: Link2, label: "Web URL", desc: "Any article link" },
              { icon: FileText, label: "Plain Text", desc: "Paste directly" },
              {
                icon: FileUp,
                label: "PDF",
                desc: "Research papers, reports",
              },
              {
                icon: BookOpen,
                label: "DOCX",
                desc: "Word documents",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                style={{
                  padding: "28px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  backgroundColor: "var(--bg-card)",
                  textAlign: "center",
                }}
              >
                <item.icon
                  size={28}
                  style={{
                    color: "var(--accent-primary)",
                    marginBottom: "12px",
                  }}
                />
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-heading-1" style={{ marginBottom: "16px" }}>
            Ready to read smarter?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-tertiary)",
              marginBottom: "36px",
              maxWidth: "480px",
              margin: "0 auto 36px",
            }}
          >
            Start summarizing articles in seconds. No credit card required.
          </p>
          <Link
            href="/summarize"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--accent-primary)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(59,91,219,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
                color: "var(--text-primary)",
              }}
            >
              Briefly
            </span>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                marginTop: "4px",
              }}
            >
              Read less. Know more.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "0.875rem",
              color: "var(--text-tertiary)",
            }}
          >
            <Link
              href="/summarize"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Summarize
            </Link>
            <Link
              href="/history"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              History
            </Link>
            <Link
              href="/auth/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            © {new Date().getFullYear()} Briefly. Built with T5 + FastAPI +
            Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
