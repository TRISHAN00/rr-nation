import FeaturedEventCard from "./FeaturedEventCard";

export default function FeatureEventList() {
  return (
    <section className="featured-event bg-[#E0F7F6] lg:py-35 py-20 ">
      <div className="container m-auto px-7.5">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-20 relative z-10 px-4">
          <span className="text-brand uppercase font-bold tracking-wide text-sm">
            EVENTS
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
            Our Events
          </h2>
        </div>

        <FeaturedEventCard
          bgImage="/dynamic/home/banner/banner-01.jpg"
          bgColor="#003A3B"
          overlayColor="#003A3B"
        />

        <FeaturedEventCard bgColor="#004C0B" overlayColor="#004C0B" bgImage="/dynamic/home/banner/banner-01.jpg" />
        <FeaturedEventCard bgColor="#03726D" />
      </div>
    </section>
  );
}
