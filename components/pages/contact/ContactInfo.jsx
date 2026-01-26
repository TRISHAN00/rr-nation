import { Headset, MapPin, PhoneCall } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="pt-24 sm:pt-28 lg:pt-35 pb-16 sm:pb-18 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div
          className="
            bg-brand rounded-3xl overflow-hidden
            grid grid-cols-1 md:grid-cols-3
            divide-y md:divide-y-0 md:divide-x
            divide-white/30
            py-8 sm:py-10
            px-6 sm:px-10 lg:px-17.5
          "
        >
          {/* Item */}
          <div className="flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-0">
            <div className="bg-white h-14 w-14 sm:h-17 sm:w-17 rounded-full flex items-center justify-center">
              <MapPin size={24} className="sm:size-[30px] text-black" />
            </div>
            <h6 className="text-white text-lg sm:text-[20px] mb-2 mt-4 sm:mt-6 font-medium">
              Office Address
            </h6>
            <p className="text-[#80D9D4] text-sm sm:text-[16px] leading-6 font-medium max-w-xs">
              H-1, R-6, S-12, B-E, Extended Rupnagar R/A, Pallabi, Mirpur
            </p>
          </div>

          {/* Item */}
          <div className="flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-0">
            <div className="bg-white h-14 w-14 sm:h-17 sm:w-17 rounded-full flex items-center justify-center">
              <PhoneCall size={24} className="sm:size-[30px] text-black" />
            </div>
            <h6 className="text-white text-lg sm:text-[20px] mb-2 mt-4 sm:mt-6 font-medium">
              Make A Call
            </h6>
            <p className="text-[#80D9D4] text-sm sm:text-[16px] leading-6 font-medium">
              +880 1889 996700
            </p>
          </div>

          {/* Item */}
          <div className="flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-0">
            <div className="bg-white h-14 w-14 sm:h-17 sm:w-17 rounded-full flex items-center justify-center">
              <Headset size={24} className="sm:size-[30px] text-black" />
            </div>
            <h6 className="text-white text-lg sm:text-[20px] mb-2 mt-4 sm:mt-6 font-medium">
              24/7 Online Support
            </h6>
            <p className="text-[#80D9D4] text-sm sm:text-[16px] leading-6 font-medium break-all sm:break-normal">
              info.runrisenation@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
