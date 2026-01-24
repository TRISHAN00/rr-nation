import Counter from "@/components/common/counter/Counter";
import InnerBanner from "@/components/common/InnerBanner";
import OurMission from "@/components/pages/about/OurMission";
import Team from "@/components/pages/team/Team";

export default function AboutPage() {
  return (
    <>
     <InnerBanner
  title="About Us"
  background="/dynamic/about/inner-banner.jpg"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About Us" },
  ]}
/>

      <OurMission hideIcon hideBtn hideShape hideRound  />
      <Counter />
      <Team hideSearch />
    </>
  );
}
