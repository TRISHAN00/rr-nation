import { Skeleton } from "@/components/ui/skeleton";

export default function TeamCardSkeleton() {
  return (
    <div className="group bg-gray-100 relative rounded-tl-full rounded-tr-full rounded-bl-xl rounded-br-xl overflow-hidden">
      <div className="rounded-full overflow-hidden relative aspect-square bg-transparent">
        <Skeleton className="w-full h-full rounded-full" />
        <Skeleton className="absolute inset-0 rounded-full opacity-50" />
      </div>
      <div className="text-center px-4 pt-6 pb-2 space-y-3">
        <Skeleton className="h-4 rounded mx-auto w-3/4" />
        <Skeleton className="h-3 rounded mx-auto w-1/2" />
      </div>
    </div>
  );
}