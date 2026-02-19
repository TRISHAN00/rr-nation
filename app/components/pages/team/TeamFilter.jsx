"use client";
import clsx from "clsx";
import { useState } from "react";
import TeamCard from "./TeamCard";

const FILTERS = [
  { key: "all", label: "All Members" },
  { key: "admin", label: "Admin" },
  { key: "advisor", label: "Advisors" },
  { key: "coreTeam", label: "Core Team" },
];

export default function TeamFilter({ data }) {
  const [active, setActive] = useState("all");

  // Logic to flatten or filter the data
  const getFilteredData = () => {
    if (active === "all") {
      return [...data.admin, ...data.advisor, ...data.coreTeam];
    }
    return data[active] || [];
  };

  const filteredMembers = getFilteredData();

  return (
    <div className="w-full pt-8 sm:pt-12 lg:pt-20">
      <div className="w-full overflow-x-auto pb-6">
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={clsx(
                "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-brand transition-all duration-300 text-sm sm:text-base font-semibold",
                active === item.key ? "bg-brand text-white" : "text-brand hover:bg-brand/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 sm:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filteredMembers.map((member, index) => (
          <TeamCard key={`${member.id}-${index}`} member={member} />
        ))}
      </div>
    </div>
  );
}