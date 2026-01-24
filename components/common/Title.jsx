import SearchEvent from "../pages/events/SearchEvent";
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
  hideBtnArrow,
  hideSearch,
}) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
      {/* Left Text */}
      <div className="w-full lg:max-w-2xl text-center lg:text-left">
        {label && (
          <span className="block text-brand text-sm sm:text-base font-bold uppercase mb-2 sm:mb-4">
            {label}
          </span>
        )}

        {title && (
          <h3 className="text-dark font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug lg:leading-tight">
            {title}
          </h3>
        )}
      </div>

      {/* Right Controls */}
      {!hideBtnArrow && (
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 items-center sm:items-end">
          <FillButton className="w-full sm:w-auto">View All Blogs</FillButton>

          <SwiperArrows
            onPrev={onPrev}
            onNext={onNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
          />
        </div>
      )}

      {!hideSearch && (
        <div className="w-full flex justify-center lg:justify-end">
          <SearchEvent placeholder="Search event..." />
        </div>
      )}
    </div>
  );
}
