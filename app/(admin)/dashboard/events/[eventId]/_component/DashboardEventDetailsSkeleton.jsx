"use client";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardEventDetailsSkeleton() {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="space-y-6 pt-6">
        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetaSkeleton />
          <MetaSkeleton />
          <MetaSkeleton />
          <MetaSkeleton />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageSkeleton />
          <ImageSkeleton />
        </div>
      </CardContent>

      {/* Packages */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-6 pt-0">
        <PackageSkeleton />
        <PackageSkeleton />
        <PackageSkeleton />
      </div>
    </Card>
  );
}

/* ---------- Small Skeleton Parts ---------- */

function MetaSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

function ImageSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-32 w-full rounded-md" />
    </div>
  );
}

function PackageSkeleton() {
  return <Skeleton className="h-28 w-full rounded-lg" />;
}
