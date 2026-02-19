import Image from "next/image";

export default function AutoSlideItem() {
  return (
    <div className="flex items-center gap-3 md:gap-4 whitespace-nowrap">
      <h1
        className="
          font-bold text-light
          text-lg
          sm:text-xl
          md:text-2xl
          xl:text-3xl
        "
      >
        RunRise Nation | Let’s Run, Rise & Celebrate Together
      </h1>

      <Image
        src="/static/double-run.svg"
        alt="Run Rise Nation"
        width={28}
        height={28}
        className="
          w-5 h-5
          sm:w-6 sm:h-6
          md:w-7 md:h-7
        "
      />
    </div>
  );
}
