import JourneyArrow from "./JourneyArrow";
import JourneyItem from "./JourneyItem";
import JourneyShapeBg from "./JourneyShapeBg";

export default function JourneySection() {
  return (
    <section className="relative bg-white py-20 xl:py-28 overflow-hidden">
      <div className="relative container mx-auto px-4">
        {/* Decorative background */}
        <JourneyShapeBg />

        {/* Heading */}
        <div className="text-center mb-20 relative z-10">
          <span className="text-brand uppercase font-bold tracking-wide text-sm">
            Our Marathon Journey
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            How we make every race successful
          </h2>
        </div>

        {/* Journey Row */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-10">
          <JourneyItem
            title="Plan the Race"
            text="We plan routes, schedules, and categories carefully to ensure a safe and enjoyable race for everyone."
            icon="/static/plan-the-rance.svg"
          />

          <JourneyArrow />

          <JourneyItem
            title="Build the Community"
            text="We bring runners, volunteers, and organizers together to grow a supportive running community."
            icon="/static/build-the -community.svg"
          />

          <JourneyArrow />

          <JourneyItem
            title="Deliver the Experience"
            text="From race day to the finish line, we deliver a smooth, memorable, and rewarding marathon experience."
            icon="/static/deliver-the-exp.svg"
          />
        </div>
      </div>
    </section>
  );
}
