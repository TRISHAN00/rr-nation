import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function SMFeaturedCardLeft({
  bgImage,
  bgColor,
  overlayColor = "#00a19a",
  organizer,
}) {
  return (
    <div
      className="relative p-6 sm:p-8 lg:p-10 overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
      style={{
        backgroundColor: !bgImage ? bgColor : undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: overlayColor, opacity: 0.8 }}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <h4 className="text-white text-2xl sm:text-3xl lg:text-4xl mb-2">
            Marathon Race
          </h4>
          <h1 className="text-brand text-4xl sm:text-5xl lg:text-[80px] leading-none">
            35K
          </h1>

          <ul className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-light">
            <li className="flex items-center gap-2.5 text-sm sm:text-base">
              <MapPin size={18} /> 456 Progoti Sharini Road
            </li>
            <li className="flex items-center gap-2.5 text-sm sm:text-base">
              <Calendar size={18} /> 24 March, 2026
            </li>
          </ul>
        </div>
      </div>

      {/* ORGANIZER */}
      {organizer && (
        <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
          {organizer.logo && (
            <Image
              src={organizer.logo}
              alt={organizer.name}
              width={36}
              height={36}
              className="rounded-full bg-white p-1"
            />
          )}
          <span className="text-xs text-white opacity-80">
            By {organizer.name}
          </span>
        </div>
      )}

      {/* Decorative Shine */}
      <div className="absolute -right-2.5 top-0 hidden lg:block z-10">
        <Image
          src="/static/featured-top-righ-shine.svg"
          alt="shine"
          width={340}
          height={125}
        />
      </div>
    </div>
  );
}
