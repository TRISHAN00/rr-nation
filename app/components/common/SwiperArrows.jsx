import clsx from "clsx";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

export default function SwiperArrows({
  onPrev,
  onNext,
  isBeginning = true,
  isEnd = false,
  className,
}) {
  return (
    <div className={clsx("flex gap-3 mt-4 lg:mt-0", className)}>
      <PrevArrow isBeginning={isBeginning} onPrev={onPrev} />

      {/* Next Button */}
      <NextArrow isEnd={isEnd} onNext={onNext} />
    </div>
  );
}
