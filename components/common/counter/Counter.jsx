"use client";
import CounterItem from "./CounterItem";

export default function Counter() {
  const counters = [
    {
      imageSrc: "/static/succ-event.svg",
      count: 100,
      label: "Successful Events",
      showPlus: true,
    },
    {
      imageSrc: "/static/runner-rating.svg",
      count: 4.7,
      label: "Runner Rating",
      showPlus: false, // ✅ no plus
    },
    {
      imageSrc: "/static/active-member.svg",
      count: 960,
      label: "Active Members",
      showPlus: true,
    },
    {
      imageSrc: "/static/global-partner.svg",
      count: 20,
      label: "Global Partner",
      showPlus: true,
    },
  ];

  return (
    <div
      style={{
        backgroundImage: "url('/static/bg-counter.jpg')",
        padding: "80px 0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {counters.map((item, index) => (
          <CounterItem
            key={index}
            imageSrc={item.imageSrc}
            count={item.count}
            label={item.label}
            showPlus={item.showPlus} // pass the prop
          />
        ))}
      </div>
    </div>
  );
}
