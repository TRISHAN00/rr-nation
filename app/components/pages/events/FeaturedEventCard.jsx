import FeaturedCardLeft from "./FeaturedCardLeft";
import FeaturedCardRight from "./FeaturedCardRight";

// Reuse your brand config
const EVENT_STATUS_CONFIG = {
  live: { label: "LIVE", color: "bg-[#e11d48]", pulse: true },
  virtual: { label: "VIRTUAL", color: "bg-[#00a19a]", pulse: false },
  upcoming: { label: "UPCOMING", color: "bg-[#f39200]", pulse: false },
  successful: { label: "SUCCESSFUL", color: "bg-[#001819]", pulse: false },
};

export default function FeaturedEventCard({
  bgImage = null,
  bgColor = "#003A3B",
  overlayColor = "#003A3B",
  organizer,
  event,
}) {
  const packages = event?.packages || [];

  // Safeguard against empty packages
  const minPrice = packages.length > 0 ? Math.min(...packages.map((item) => item.price)) : 0;
  const minDistance = packages.length > 0 ? Math.min(...packages.map((item) => parseFloat(item.distance))) : 0;

  // 🏷️ Get Status Badge Data
  const statusKey = event?.eventType?.toLowerCase();
  const status = EVENT_STATUS_CONFIG[statusKey] || EVENT_STATUS_CONFIG.upcoming;

  return (
    <div
      className="font-anta rounded-3xl mb-7.5 overflow-hidden group"
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] relative">
        
        {/* 🏷️ Floating Status Badge */}
        <div className="absolute top-6 right-6 z-30">
          <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${status.color} backdrop-blur-md text-white text-[11px] font-bold tracking-[0.15em] shadow-2xl border border-white/20`}>
            {status.pulse && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
            )}
            {status.label}
          </span>
        </div>

        <FeaturedCardLeft
          bgImage={bgImage}
          bgColor={bgColor}
          overlayColor={overlayColor}
          organizer={organizer}
          event={event}
          minDistance={minDistance}
        />

        <FeaturedCardRight
          bgColor={bgColor}
          event={event}
          minPrice={minPrice}
        />
      </div>
    </div>
  );
}