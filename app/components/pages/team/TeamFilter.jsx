"use client";
import clsx from "clsx";
import TeamCard from "./TeamCard";
import TeamCardSkeleton from "./TeamCardSkeleton";

const FILTERS = [
  { key: "all", label: "All Members" },
  { key: "admin", label: "Admin" },
  { key: "advisor", label: "Advisors" },
  { key: "core_team", label: "Core Team" },
];

export default function TeamFilter({
  members = [],
  loading = false,
  hasMore = false,
  active = "all",
  onFilterChange,
  lastElementRef,
}) {
  return (
    <div className="w-full pt-8 sm:pt-12 lg:pt-20">
      <div className="w-full overflow-x-auto pb-6">
        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              onClick={() => onFilterChange(item.key)}
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
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <TeamCardSkeleton key={i} />
          ))
        ) : members.length > 0 ? (
          members.map((member, index) => {
            const isLast = index === members.length - 1;
            return (
              <TeamCard
                key={`${member.id}-${index}`}
                member={member}
                cardRef={isLast && hasMore ? lastElementRef : undefined}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 text-sm">
            No members found in this category.
          </div>
        )}
      </div>

      {!loading && hasMore && (
        <div className="grid gap-5 sm:gap-6 lg:gap-7.5 mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
        </div>
      )}
    </div>
  );
}