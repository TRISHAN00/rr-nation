"use client";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import FillButton from "../FillButton";

export default function CallUsCard() {
  return (
    <div
      style={{
        backgroundImage: "url('/dynamic/event/event-01.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative rounded-3xl overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="flex flex-col justify-between h-full gap-10">
          {/* Top Content */}
          <div>
            {/* Animated Icon */}
            <div className="relative mb-6 inline-flex">
              {/* Ripple */}
              <span className="absolute inset-0 rounded-full bg-brand opacity-30 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-brand opacity-20 animate-pulse" />

              {/* Icon */}
              <div className="relative h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-brand text-white flex items-center justify-center shadow-lg">
                <PhoneCall size={28} className="animate-call" />
              </div>
            </div>

            {/* Text */}
            <h6 className="text-lg sm:text-xl mb-2 font-medium text-white">
              Call us Anytime
            </h6>

            <h5 className="text-xl sm:text-2xl lg:text-2xl font-bold text-light">
              <Link href="tel:+8801889996700">+880 1889 996700</Link>
            </h5>

            {/* Email */}
            <div className="flex gap-2 items-center mt-6">
              <Mail size={16} className="text-brand" />
              <Link
                className="text-light text-sm sm:text-base break-all"
                href="mailto:info.runrisenation@gmail.com"
              >
                info.runrisenation@gmail.com
              </Link>
            </div>
          </div>

          {/* Button */}
          <div>
            <FillButton className="w-full sm:w-auto">Contact Us</FillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
