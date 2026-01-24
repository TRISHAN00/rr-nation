import InnerBanner from "@/components/common/InnerBanner";
import Events from "@/components/pages/events/Events";

export default function EventsPage() {
  return (
    <>
      <InnerBanner
        title="Events"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <Events/>
    </>
  );
}
