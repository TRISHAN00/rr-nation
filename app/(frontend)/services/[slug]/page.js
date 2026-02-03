import InnerBanner from "@/app/components/common/InnerBanner";
import ServiceDetail from "@/app/components/pages/services/ServiceDetail";

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
