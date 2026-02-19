import Image from "next/image";
import HeaderSocial from "../header/HeaderSocial";

export default function FooterSocial({ gap }) {
  return (
    <div>
      {/* Title */}
      <h6 className="text-[#FAFAFA] text-[24px] leading-7 font-bold mb-7.5">
        Stay Connected
      </h6>
      <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-8 text-gray">
        Follow us for news & updates
      </p>
      <HeaderSocial bgColor="#00A19A" size={36} gap={gap} />

      <div className="flex gap-3 mt-5">
        <Image
          width={400}
          height={100}
          src="/static/sslz.png"
          alt="Visa"
          className="w-full h-full"
        />
      </div>
      <h4 className="text-[#FAFAFA] text-[14px] mt-4 opacity-80">
        Trade License Number: TRAD/DNCC/023534/2025
      </h4>
    </div>
  );
}
