import Counter from "@/components/common/counter/Counter";
import InnerBanner from "@/components/common/InnerBanner";
import OurMission from "@/components/pages/about/OurMission";
import Team from "@/components/pages/team/FeatureTeamSlide";

export const metadata = {
  title: "About Us | The Heart of RunRise Nation",
  description:
    "Learn about RunRise Nation's mission to transform fitness in Bangladesh. Meet our dedicated team of marathon enthusiasts and discover our journey toward becoming an AIMS-associate community.",
  keywords: [
    "About RunRise Nation",
    "RRN Team",
    "Bangladesh Running Founders",
    "RunRise Mission",
    "Fitness Leadership Bangladesh",
  ],
  openGraph: {
    title: "About RunRise Nation - Our Mission & Team",
    description:
      "Discover the story behind Bangladesh's most active running community. Meet the people making it happen.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <InnerBanner
        title="About Us"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <OurMission hideIcon hideBtn hideShape hideRound />
      <Counter />
      <Team hideSearch />
    </>
  );
}
