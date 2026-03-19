import { TableCell, TableRow } from "@/app/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderListSkeleton({ fieldCout }) {
  return (
    <>
      {[...Array(fieldCout)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-15" />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-30" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-17.5" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-35" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-20 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export function OrderStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-6 border rounded-xl bg-card space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
