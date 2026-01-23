import FillButton from "./FillButton";
import SwiperArrows from "./SwiperArrows";

export default function Title({
  label,
  title,
  onPrev,
  onNext,
  showArrows = true,
  isBeginning,
  isEnd,
}) {
  return (
    <div className="flex flex-col gap-6 mb-10 sm:mb-12 lg:flex-row lg:items-center lg:justify-between">
      {/* Text */}
      <div className="w-full lg:max-w-2xl">
        <span className="block text-brand text-sm sm:text-base font-bold uppercase mb-2 sm:mb-4">
          Blog
        </span>

        <h3 className="text-dark font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug lg:leading-tight">
          Lorem ipsum dolor sit amet consectetur. Aliquet aliquet mauris
        </h3>
      </div>

      {/* CTA + Arrows */}
      <div className="w-full lg:w-auto flex  sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:items-end">
        {/* Button */}
        <FillButton className="w-full sm:w-auto">View All Blogs</FillButton>

        {/* Swiper Arrows */}
        <div className="flex justify-end sm:justify-start lg:justify-end">
          <SwiperArrows
            onPrev={onPrev}
            onNext={onNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
          />
        </div>
      </div>
    </div>
  );
}
