import FeaturedCardLeft from "./FeaturedCardLeft";
import FeaturedCardRight from "./FeaturedCardRight";

export default function FeaturedEventCard({
  bgImage = null,
  bgColor = "#003A3B",
  overlayColor = "#003A3B",
  organizer,
  event,
}) {
   const packages = event?.packages;

   const minPrice = Math.min(...packages.map(item => item.price));
const minDistance = Math.min(...packages.map(item => parseFloat(item.distance)));

console.log(`Min Price: ${minPrice}, Min Distance: ${minDistance} KM`);
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
          event={event}
          minDistance={minDistance}
         
        />

        <FeaturedCardRight bgColor={bgColor} event={event}  minPrice={minPrice} />
      </div>
    </div>
  );
}
