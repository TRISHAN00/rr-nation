import clsx from "clsx";

export default function SubtitleWithArrow({
  label,
  title,
  onPrev,
  onNext,
  showArrows = true,
  className,
  isBeginning,
  isEnd,
  bgColor
}) {
  return (
    <div  className={clsx("w-full", className)}>
      <span className="block text-brand text-sm sm:text-[16px] leading-5 font-bold uppercase mb-2 sm:mb-4">
        {label}
      </span>

      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-dark w-full lg:w-112.5 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug sm:leading-snug md:leading-snug lg:leading-tight max-w-full lg:max-w-3xl">
          {title}
        </h3>

        {/* {showArrows && (
          <SwiperArrows
            onPrev={onPrev}
            onNext={onNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
          />
        )} */}
      </div>
    </div>
  );
}
