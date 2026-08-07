"use client";
import CounterItem from "./CounterItem";

export default function Counter({ data }) {
  const counters = data?.posts?.list || [];

  return (
    <section
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
        {counters.map((item, index) => {
          console.log(item)
          const number = item?.data?.number || 0;
          const label = item?.data?.title || "";
          const icon = item?.images?.[0]?.full_path || "";
          const suffix = item?.data?.suffix || "";
          return (
            <CounterItem
              key={index}
              imageSrc={icon}
              count={number}
              label={label}
              suffix={suffix} // pass the prop
            />
          )
        })}
      </div>
    </section>
  );
}
