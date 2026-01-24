import FeaturedCardLeft from "./FeaturedCardLeft";
import FeaturedCardRight from "./FeaturedCardRight";

export default function SMFeatureEventCard({
  bgImage = null,
  bgColor = "#003A3B",
  overlayColor = "#003A3B",
  organizer,
}) {
  return (
    <div
      className="font-anta rounded-3xl mb-7.5 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] relative">
        <FeaturedCardLeft
          bgImage={bgImage}
          bgColor={bgColor}
          overlayColor={overlayColor}
          organizer={organizer}
        />

        <FeaturedCardRight bgColor={bgColor} />
      </div>
    </div>
  );
}
