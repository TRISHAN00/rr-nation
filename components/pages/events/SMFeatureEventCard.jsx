import SMFeaturedCardLeft from "./SMFeaturedCardLeft";
import SMFeaturedCardRight from "./SMFeaturedCardRight";

export default function SMFeatureEventCard({
  bgImage = null,
  bgColor = "#003A3B",
  overlayColor = "#003A3B",
  organizer,
}) {
  return (
    <div className="font-anta rounded-3xl  overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] relative">
        {/* Left card */}
        <SMFeaturedCardLeft
          bgImage={bgImage}
          bgColor={bgColor}
          overlayColor={overlayColor}
          organizer={organizer}
        />

        {/* Right card */}
        <SMFeaturedCardRight bgColor={bgColor} />
      </div>
    </div>
  );
}
