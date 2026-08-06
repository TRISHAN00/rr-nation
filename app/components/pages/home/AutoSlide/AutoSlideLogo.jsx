import AutoSlideItem from "./AutoSlideItem";

export default function AutoSlideLogo({ data }) {
  const items = data?.posts?.list;

  return (
    <section className="bg-brand py-6 overflow-hidden">
      <div
        className="flex w-max gap-10"
        style={{
          animation: "marquee 100s linear infinite",
        }}
      >
        {
          items?.length > 0 && items.map((item, index) => (
            <AutoSlideItem key={index} item={item} />
          ))
        }
      </div>

      {/* global keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
