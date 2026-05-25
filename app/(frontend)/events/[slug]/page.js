import EventDetail from "@/app/components/pages/events/EventDetail";
import { getEventBySlug } from "@/services/user.service";

// NEXT.JS DYNAMIC METADATA GENERATOR RUNNING ON THE SERVER
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const res = await getEventBySlug(slug);
    const event = res?.data?.data || null;

    if (!event) {
      return {
        title: "Event Not Found | RunRise Nation",
        description: "The requested event registration data could not be located.",
      };
    }

    // Extract package names/pricing dynamically for search engine indexing
    const keywordsList = event.packages?.map(
      (pak) => `${pak.name || "Package"} - ${pak.price} BDT`
    ) || [];

    return {
      title: `${event.name} | RunRise Nation`,
      description: event.description || `Join us for the ${event.name} running event. Celebrate health, culture, and community with RunRise Nation.`,
      keywords: [event.name, "RunRise Nation Marathon", ...keywordsList],
      openGraph: {
        title: event.name,
        description: event.description || `Register for ${event.name} today.`,
        type: "article",
        images: [
          {
            url: event.bannerImage || "/dynamic/about/inner-banner.jpg",
            width: 1200,
            height: 630,
            alt: event.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata generation failure:", error);
    return {
      title: "RunRise Nation Events",
      description: "Explore ongoing, upcoming, and past marathon running events.",
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