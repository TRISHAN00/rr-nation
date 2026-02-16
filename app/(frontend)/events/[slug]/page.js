import EventDetail from "@/app/components/pages/events/EventDetail";

export const metadata = {
  title: "Account Day Run 2025 | RunRise Nation",
  description:
    "Join the Account Day Run 2025 organized by RunRise Nation. Get event details, race categories, route maps, and registration information for this premier running event in Bangladesh.",
  keywords: [
    "Account Day Run 2025",
    "RunRise Nation Event",
    "Dhaka 15K Run",
    "Bangladesh Running Race",
    "RRN Account Day",
  ],
  openGraph: {
    title: "Account Day Run 2025 - Register Now",
    description:
      "Lace up for the Account Day Run 2025. Be part of the movement and rise with the community!",
    type: "article", // Or 'website'
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Account Day Run 2025 Banner",
      },
    ],
  },
};

export default function EventDetailPage() {
  
  return (
    <>
    
      <EventDetail />
    </>
  );
}
