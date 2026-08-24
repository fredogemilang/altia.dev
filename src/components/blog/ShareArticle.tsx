import { useState, useEffect } from "react";
import { Share2, Link as LinkIcon, Check, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface ShareArticleProps {
  url: string;
  title: string;
  shareLabel?: string;
  copiedLabel?: string;
  copyLinkLabel?: string;
}

export function ShareArticle({
  url,
  title,
  shareLabel = "Share Article",
  copiedLabel = "Link Copied!",
  copyLinkLabel = "Copy Link",
}: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanNativeShare(true);
    }
  }, []);

  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.warn("Failed to copy URL:", err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        // User dismissed
      }
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${fullUrl}`
  )}`;

  return (
    <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EB] border border-warm-border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-warm-border">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-vermilion" />
          <h3 className="font-display font-bold text-sm tracking-wide text-charcoal uppercase">
            {shareLabel}
          </h3>
        </div>

        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className="text-xs font-mono text-charcoal-muted hover:text-vermilion transition-colors lg:hidden"
            aria-label="Native share"
          >
            Share...
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-2xl bg-cream border border-warm-border flex items-center justify-center text-charcoal-muted hover:text-charcoal hover:bg-ivory hover:border-charcoal/30 hover:scale-105 transition-all shadow-xs"
          title="Share on X / Twitter"
          aria-label="Share on X"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-2xl bg-cream border border-warm-border flex items-center justify-center text-charcoal-muted hover:text-[#0077B5] hover:bg-ivory hover:border-[#0077B5]/40 hover:scale-105 transition-all shadow-xs"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-2xl bg-cream border border-warm-border flex items-center justify-center text-charcoal-muted hover:text-[#25D366] hover:bg-ivory hover:border-[#25D366]/40 hover:scale-105 transition-all shadow-xs"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className={`flex-1 min-w-[130px] h-10 px-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all shadow-xs ${
            copied
              ? "bg-emerald-500 text-ivory border-emerald-600 scale-[1.02]"
              : "bg-cream border-warm-border text-charcoal-muted hover:text-charcoal hover:bg-ivory hover:border-charcoal/30"
          }`}
          title="Copy Article Link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{copiedLabel}</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{copyLinkLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
