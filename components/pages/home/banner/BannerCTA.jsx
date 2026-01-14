import FillButton from "@/components/common/FillButton";
import Gallery from "@/components/common/Gallery";
import RunIcon from "@/components/icons/RunIcon";

export default function BannerCTA() {
  return (
    <div className=" w-2xl">
      <span className="block font-bold text-[14px] sm:text-[16px] leading-[20px] uppercase text-[#00a19a] mb-4 sm:mb-5">
        Run Rise Nation
      </span>

      {/* Heading */}
      <h1 className="font-['Albert_Sans'] font-black text-[34px] sm:text-[44px] lg:text-[62px] leading-[42px] sm:leading-[54px] lg:leading-[72px] tracking-[-0.02em] text-[#FAFAFA]">
        Stride Together for a Better Tomorrow
      </h1>
      {/* Description */}
      <p className="font-semibold text-[15px] sm:text-[16px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[28px] mt-4 sm:mt-5 mb-8 sm:mb-10 text-[var(--color-light)]">
        Join a growing community of runners committed to fitness,
        sustainability, and positive environmental impact.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        <FillButton
          hoverBg="#001819"
          textColor="#FAFAFA"
          hoverText="#FAFAFA"
          iconPosition="right"
          gifIcon={<RunIcon icon="/static/marathon.gif" />}
        >
          Start Running Today
        </FillButton>
        
        {/* Video CTA */}
        <Gallery/>

      </div>
    </div>
  );
}
