"use client";
import Image from "next/image";
import CountUp from "react-countup";

export default function CounterItem({
  imageSrc,
  count,
  label,
  showPlus = true,      // ✅ new prop
  imageHeight = 80,
  imageWidth = 80,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Image
        src={imageSrc}
        height={imageHeight}
        width={imageWidth}
        alt={label}
      />
      <h2 className="text-light text-[36px] leading-snug font-bold mt-5 mb-2.5">
        <CountUp start={0} end={count} duration={2} separator="," />
        {showPlus && "+"}
      </h2>
      <span className="text-light text-[20px] leading-6 font-medium">
        {label}
      </span>
    </div>
  );
}
