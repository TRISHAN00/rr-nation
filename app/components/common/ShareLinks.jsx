"use client";

import { useEffect, useState } from "react";
import { Facebook, Link2, Mail, Share2, Twitter } from "lucide-react";

export default function ShareLinks({ url, title }) {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (!currentUrl && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [currentUrl]);

  const shareUrl = currentUrl || url || "";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(title || "")}`,
    email: `mailto:?subject=${encodeURIComponent(
      title || ""
    )}&body=${encodeURIComponent(shareUrl)}`,
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text: `Check this out: ${title}`,
        url: shareUrl,
      });
    } catch {
      // user cancelled
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur p-5 sm:p-6 space-y-4">
      <p className="font-semibold text-dark text-base">
        Share
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        <ShareIcon href={shareLinks.facebook} label="Facebook">
          <Facebook className="w-5 h-5" />
        </ShareIcon>

        <ShareIcon href={shareLinks.twitter} label="Twitter">
          <Twitter className="w-5 h-5" />
        </ShareIcon>

        <ShareIcon href={shareLinks.email} label="Email">
          <Mail className="w-5 h-5" />
        </ShareIcon>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray/20
                     hover:bg-brand hover:text-white transition"
        >
          <Link2 className="w-5 h-5" />
        </button>

        {/* Native Share (mostly mobile) */}
        <button
          onClick={handleNativeShare}
          aria-label="Native share"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray/20
                     hover:bg-brand hover:text-white transition"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* Reusable Icon Button */
function ShareIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full
                 border border-gray/20
                 hover:bg-brand hover:text-white
                 transition"
    >
      {children}
    </a>
  );
}