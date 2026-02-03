import InnerBanner from "@/app/components/common/InnerBanner";
import Team from "@/app/components/pages/team/Team";

export const metadata = {
  title: "Meet the Team | The Leaders of RunRise Nation",
  description: "Get to know the dedicated individuals leading RunRise Nation. Our team of experienced runners, coaches, and organizers is committed to building a healthier Bangladesh.",
  keywords: [
    "RunRise Nation Team", 
    "RRN Founders", 
    "Running Coaches Bangladesh", 
    "Marathon Organizers Dhaka", 
    "RRN Leadership",
    "Fitness Experts Bangladesh"
  ],
  openGraph: {
    title: "The Faces of RunRise Nation - Our Team",
    description: "Meet the passionate team driving the running revolution in Bangladesh. Dedicated to helping you rise.",
    type: "website",
    images: [
      {
        url: "/dynamic/about/inner-banner.jpg", 
        width: 1200,
        height: 630,
        alt: "RunRise Nation Leadership Team",
      },
    ],
  },
};

export default function TeamPage() {
  return (
    <>
      <InnerBanner
        title="Team"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />
      <Team/>
    </>
  );
}
