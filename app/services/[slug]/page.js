import InnerBanner from "@/components/common/InnerBanner";
import ServiceDetail from "@/components/pages/services/ServiceDetail";

export default function ServiceDetailPage() {
  return (
    <>
      <InnerBanner
        title="Services"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "ABC" },
        ]}
      />
      <ServiceDetail/>
    </>
  );
}
