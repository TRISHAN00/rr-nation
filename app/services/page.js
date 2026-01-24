import InnerBanner from "@/components/common/InnerBanner";

export default function ServicePage() {
  return (
    <>
      <InnerBanner
        title="Services"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
    </>
  );
}
