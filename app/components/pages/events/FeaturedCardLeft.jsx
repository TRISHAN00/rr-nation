import Logo from "@/app/components/common/Logo";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function FeaturedCardLeft({
  bgImage,
  bgColor,
  overlayColor = "#00a19a",
  organizer,
  event,
}) {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  console.log(event)
  return (
    <div
      className="relative p-6 sm:p-8 lg:p-10 overflow-hidden"
      style={{
        backgroundColor: !bgImage ? bgColor : undefined,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay when image exists */}
      {bgImage && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: overlayColor, opacity: 0.8 }}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        <div>
          <h4 className="text-white text-3xl sm:text-4xl lg:text-5xl mb-2">
            {event?.name}
          </h4>

          <h1 className="text-brand text-6xl sm:text-7xl lg:text-[120px] leading-none">
            35K
          </h1>

          <ul className="mt-5 space-y-2 text-light lg:flex items-center gap-4">
            <li className="flex mb-0 items-center gap-2.5 text-sm sm:text-base">
              <MapPin size={18} /> {event?.address}
            </li>
            <li className="flex mb-0 items-center gap-2.5 text-sm sm:text-base">
              <Calendar size={18} /> {formatDate(event?.date)}
            </li>
          </ul>
        </div>

        <div className="text-[#B3E9E7] text-sm sm:text-base flex justify-between flex-col">
         

          <div className=" flex mt-4 justify-center lg:items-center flex-col ">
            <Logo />
            <h6>{event?.organizerName}</h6>
          </div>
        </div>
      </div>

      {/* ✅ ORGANIZER (Optional) */}
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
