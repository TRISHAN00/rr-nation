"use client";
import clsx from "clsx";
import { useState } from "react";
import TeamCard from "./TeamCard";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "virtual", label: "Virtual" },
  { key: "upcoming", label: "Upcoming" },
  { key: "successful", label: "Successful" },
];

export default function TeamFilter({ onChange }) {
  const [active, setActive] = useState("all");

  const handleChange = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <div className="w-full pt-8 sm:pt-12 lg:pt-20">
      {/* 🔘 Filters */}
      <div className="w-full overflow-x-auto pb-6">
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleChange(item.key)}
              className={clsx(
                "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full",
                "text-sm sm:text-base font-semibold whitespace-nowrap",
                "border border-brand transition-all duration-300",
                active === item.key
                  ? "bg-brand text-white shadow-md"
                  : "text-brand hover:bg-brand/10",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🧩 Event Grid */}
      <div className=" grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  ">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </div>
  );
}
