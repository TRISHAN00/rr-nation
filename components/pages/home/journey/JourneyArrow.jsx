import Image from "next/image";

export default function JourneyArrow() {
  return (
    <div className="hidden lg:flex items-center">
      <Image
        src="/static/arrow-shape.svg"
        alt="journey arrow"
        width={90}
        height={40}
        className="rotate-[135deg]"
      />
    </div>
  );
}
