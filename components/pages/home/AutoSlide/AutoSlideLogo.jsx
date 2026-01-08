import AutoSlideItem from "./AutoSlideItem";

export default function AutoSlideLogo() {
  return (
    <div className="bg-brand py-6 overflow-hidden">
      <div
        className="flex w-max gap-10"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />

        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
        <AutoSlideItem />
      </div>

      {/* global keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
