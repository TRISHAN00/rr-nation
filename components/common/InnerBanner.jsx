import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InnerBanner() {
  return (
    <section
      className="relative flex items-end justify-center sm:justify-start
                 h-[320px] sm:h-[420px] md:h-[480px] lg:h-[550px]
                 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/dynamic/about/inner-banner.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative m-auto z-10 mb-10 sm:mb-14 lg:mb-20 px-4 sm:px-8 lg:px-16 text-center sm:text-left">
        <h2 className="text-2xl text-center sm:text-3xl md:text-4xl lg:text-[46px] font-bold text-white mb-3 sm:mb-4 leading-tight">
          About Us
        </h2>

        {/* Breadcrumb */}
        <ul className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-white font-medium">
          <li>
            <Link href="/" className="hover:underline">
              Run Rise Nation
            </Link>
          </li>

          <ArrowRight size={14} className="opacity-80" />

          <li className="opacity-90">About Us</li>
        </ul>
      </div>
    </section>
  );
}
