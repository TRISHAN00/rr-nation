import InnerBanner from "@/components/common/InnerBanner";
import Services from "@/components/pages/services/Services";

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
