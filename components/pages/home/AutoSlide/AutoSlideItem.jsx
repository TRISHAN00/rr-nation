import Image from "next/image";

export default function AutoSlideItem() {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <h1 className="text-2xl md:text-3xl font-bold text-light">
        RunRise Nation
      </h1>
      <Image
        src="/static/double-run.svg"
        alt="run rise nation"
        width={28}
        height={28}
      />
    </div>
  );
}
     