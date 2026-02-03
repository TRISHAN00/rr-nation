import InnerBanner from "@/app/components/common/InnerBanner";
import Services from "@/app/components/pages/services/Services";


export const metadata = {
  title: "Our Services | Professional Running & Fitness Solutions",
  description: "Explore the services offered by RunRise Nation, including professional race timing, marathon organizing, corporate wellness programs, and personalized running coaching in Bangladesh.",
  keywords: [
    "Race Management Bangladesh", 
    "Corporate Wellness Programs Dhaka", 
    "Professional Race Timing", 
    "Running Coaching", 
    "Event Organizing Services",
    "AIMS Associate Services"
  ],
  openGraph: {
    title: "RunRise Nation Services - Beyond the Finish Line",
    description: "From corporate fitness to professional event management, discover how we help the nation run and rise.",
    type: "website",
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg", 
        width: 1200,
        height: 630,
        alt: "RunRise Nation Professional Services",
      },
    ],
  },
};

export default function ServicePage() {
  return (
    <>
      <InnerBanner
        title="Services"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Services/>
    </>
  );
}
