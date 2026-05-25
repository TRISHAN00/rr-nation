import EventDetail from "@/app/components/pages/events/EventDetail";
import { getEventBySlug } from "@/services/user.service";



export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Define your fallback fallback domain explicitly
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rr-nation.vercel.app";

  try {
    const res = await getEventBySlug(slug);
    const event = res?.data?.data || null;

    if (!event) {
      return {
        title: "Event Not Found | RunRise Nation",
      };
    }

    // CRITICAL: Format image path to be an absolute URL
    const rawImageUrl = event.bannerImage || "/dynamic/about/inner-banner.jpg";
    const absoluteImageUrl = rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${siteUrl}${rawImageUrl}`;

    const currentEventUrl = `${siteUrl}/events/${slug}`;

    return {
      title: `${event.name} | RunRise Nation`,
      description: event.description || `Join us for ${event.name}.`,
      alternates: {
        canonical: currentEventUrl,
      },

      // OpenGraph specs (Used by WhatsApp, Facebook, Discord)
      openGraph: {
        title: event.name,
        description: event.description,
        type: "article",
        url: `${siteUrl}/events/${slug}`,
        siteName: "RunRise Nation",
        images: [
          {
            url: absoluteImageUrl, // Must be absolute!
            width: 1200,
            height: 630,
            alt: event.name,
          },
        ],
      },

      // Twitter Card specs (Fallback parsing used by many link expanders)
      twitter: {
        card: "summary_large_image",
        title: event.name,
        description: event.description,
        images: [absoluteImageUrl],
      },
    };
  } catch (error) {
    console.error("Metadata image setup error:", error);
    return {
      title: "RunRise Nation Events",
    };
  }
}
// MAIN ROUTE WRAPPER (SERVER DRIVEN)
export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <EventDetail initialSlug={slug} />
    </>
  );
}