"use client";

import { Skeleton } from "@/app/components/ui/skeleton";

export default function InnerBannerSkeleton() {
  return (
    <section className="relative flex items-end justify-center sm:justify-start h-80 sm:h-105 md:h-120 lg:h-137.5 bg-muted overflow-hidden">
      {/* Overlay placeholder */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 mb-10 sm:mb-14 lg:mb-20 px-4 sm:px-8 lg:px-16 text-center sm:text-left w-full">
        {/* Title skeleton */}
        <Skeleton className="h-8 sm:h-9 md:h-10 lg:h-12 w-3/4 mx-auto sm:mx-0 mb-4" />

        {/* Breadcrumb skeleton */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </section>
  );
}
