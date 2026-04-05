import SMFeaturedCardLeft from "./SMFeaturedCardLeft";
import SMFeaturedCardRight from "./SMFeaturedCardRight";

export default function SMFeatureEventCard({
  bgImage = null,
  bgColor = "#003A3B",
  overlayColor = "#003A3B",
  organizer,
  title,
  price,
  event,
  pak
}) {
  const isSoldOut = pak?.availableSlots === pak?.usedSlots;


  return (
    <div className="font-anta rounded-3xl  overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] relative">
        {/* Left card */}
        <SMFeaturedCardLeft
          bgColor={bgColor}
          overlayColor={overlayColor}
          organizer={event?.organizer}
          title={title}
          event={event}
          pak={pak}
        />

        {/* Right card */}
        <SMFeaturedCardRight
          bgColor={bgColor}
          price={price}
          event={event}
          pak={pak}
          isSoldOut={isSoldOut}
        />
      </div>
    </div>
  );
}
