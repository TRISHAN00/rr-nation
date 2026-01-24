import InnerBanner from "@/components/common/InnerBanner";
import EventDetail from "@/components/pages/events/EventDetail";

export default function EventDetailPage() {
  return (
    <>
      <InnerBanner
        title="Account Day Run 2025"
        background="/dynamic/about/inner-banner.jpg"
        breadcrumbs={[{ label: "Events", href: "/events" }, { label: "Account Day Run 2025" }]}
      />
      <EventDetail/>
    </>
  );
}
