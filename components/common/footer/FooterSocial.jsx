import HeaderSocial from "../header/HeaderSocial";

export default function FooterSocial() {
  return (
    <div>
      {/* Title */}
      <h6 className="text-[#FAFAFA] text-[24px] leading-[28px] font-bold mb-[30px]">
        Stay Connected
      </h6>
      <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-8 text-[#868681]">
        Follow us for news & updates
      </p>
      <HeaderSocial bgColor="#00A19A" size={36} />
    </div>
  );
}
