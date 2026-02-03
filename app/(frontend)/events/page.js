import InnerBanner from "@/app/components/common/InnerBanner";
import Events from "@/app/components/pages/events/Events";

export const metadata = {
  title: "Upcoming Running Events & Marathons | RunRise Nation",
  description: "Register for the latest marathons, 15K runs, and virtual challenges in Bangladesh. Join RunRise Nation's officially timed events and track your progress.",
  keywords: [
    "RunRise Nation Events", 
    "Bangladesh Marathons 2026", 
    "15K Run Dhaka", 
    "Virtual Running Challenges", 
    "AIMS Certified Races Bangladesh", 
    "Running Competition"
  ],
  openGraph: {
    title: "RunRise Nation Events - Lace Up and Join Us",
    description: "Find your next race. From 5K fun runs to competitive 15K challenges, discover all RunRise Nation events here.",
    type: "website",
    images: [
      {
        url: "/dynamic/events-og.jpg", // A high-energy race photo works best here
        width: 1200,
        height: 630,
        alt: "RunRise Nation Race Start Line",
      },
    ],
  },
};

export default function EventsPage() {
  return (
    <>
      <InnerBanner
        title="Events"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <Events/>
    </>
  );
}
