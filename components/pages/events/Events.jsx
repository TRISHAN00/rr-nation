import Title from "@/components/common/Title";
import EventFilter from "./EventFilter";
import EventSwitch from "./EventSwitch";

export default function Events() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-7.5 py-14 sm:py-20 lg:py-30">
      <Title
        label="EVENTS"
        title="Explore Our Featured Running Programs"
        hideBtnArrow
        searchPlaceholder="Search event..."
      />

      {/* Switch */}
      <div className="flex justify-center pt-8 sm:pt-12 lg:pt-20">
        <EventSwitch />
      </div>

      {/* Filter */}
      <div className="flex justify-center pt-6 sm:pt-10 lg:pt-16">
        <EventFilter />
      </div>
    </section>
  );
}

