import Counter from "@/components/common/counter/Counter";
import InnerBanner from "@/components/common/InnerBanner";
import OurMission from "@/components/pages/about/OurMission";

export default function AboutPage() {
  return (
    <>
      <InnerBanner />
      <OurMission hideIcon hideBtn hideShape hideRound />
      <Counter/>
    </>
  );
}
