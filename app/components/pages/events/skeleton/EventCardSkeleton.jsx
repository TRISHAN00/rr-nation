"use client";

import { AspectRatio } from "@/app/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="relative rounded-4xl overflow-hidden w-full bg-[#E0F7F6]">
      <div className="p-4 flex flex-col">
        {/* Image Skeleton */}
        <AspectRatio
          ratio={20 / 10}
          className="rounded-t-4xl overflow-hidden"
        >
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        {/* Content */}
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-4">
          {/* Title */}
          <Skeleton className="h-6 sm:h-7 lg:h-8 w-3/4" />

          {/* Divider */}
          <Skeleton className="h-1 w-12" />

          {/* Date + Location */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Date box */}
            <Skeleton className="h-16 w-16 rounded-lg shrink-0" />

            {/* Location */}
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
