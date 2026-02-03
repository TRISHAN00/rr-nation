"use client";

import { Calendar, Facebook, Mail, Share2, Twitter } from "lucide-react";

export default function ShareLinks({
  eventUrl = "https://tickify.live/events/accounting-day-run-2025",
  title = "Accounting Day Run 2025",
  location = "Hatirjheel, Dhaka",
  startDate = "20251107T053000Z",
  endDate = "20251107T063000Z",
}) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      eventUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      eventUrl
    )}&text=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(eventUrl)}`,
    googleCalendar: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&location=${encodeURIComponent(location)}`,
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text: `Check out this event: ${title}`,
        url: eventUrl,
      });
    } catch {
      // user cancelled
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

        <ShareIcon href={shareLinks.googleCalendar} label="Add to Calendar">
          <Calendar className="w-5 h-5" />
        </ShareIcon>

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
