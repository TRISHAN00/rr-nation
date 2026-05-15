import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
    return (
        <div className="p-6 border rounded-xl bg-card space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
    );
}