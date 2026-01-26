import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EventCard() {
  return (
    <Link href="/events/account-day-run-2025" className="block">
      <div className="group relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6]">
        {/* Card BG – Bottom to Top */}
        <span className="absolute inset-0 bg-[#f090008f] scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />

        {/* Card Content */}
        <div className="relative p-4 flex flex-col z-10">
          {/* Image */}
          <AspectRatio ratio={14 / 11} className="bg-muted rounded-t-4xl overflow-hidden">
            <Image
              src="/dynamic/event/event-01.jpg"
              alt="Accounting Day Run"
              fill
              className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>

          {/* Content */}
          <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
            <h5 className="text-dark group-hover:text-white text-lg sm:text-xl lg:text-2xl font-bold leading-snug transition-colors duration-300">
              Accounting Day Run 2025
            </h5>

            <div className="bg-brand h-1 w-12"></div>

            {/* Date + Location */}
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Date Box */}
              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                {/* Date BG – Top to Bottom */}
                <span className="absolute inset-0 bg-brand scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100 z-0" />

                {/* Date Content */}
                <div className="relative z-10 bg-[#090909] group-hover:bg-transparent h-full w-full flex flex-col items-center justify-center px-2.5 transition-colors duration-300">
                  <h4 className="text-[28px] sm:text-[30px] font-bold text-white leading-none">
                    7
                  </h4>
                  <span className="text-white text-sm font-medium leading-5">
                    NOV
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="text-gray group-hover:text-white transition-colors duration-300" />
                <p className="text-gray group-hover:text-white text-sm sm:text-[16px] leading-5 sm:leading-6 font-medium transition-colors duration-300">
                  Hatirjheel, Dhaka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
