import InnerBanner from "@/components/common/InnerBanner";
import Team from "@/components/pages/team/Team";

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
