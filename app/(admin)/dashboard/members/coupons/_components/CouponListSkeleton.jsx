import { TableCell, TableRow } from "@/app/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function CouponListSkeleton({ rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {/* ID */}
          <TableCell>
            <Skeleton className="h-4 w-10" />
          </TableCell>

          {/* Code */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Type */}
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>

          {/* Value */}
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>

          {/* Usage */}
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          {/* Status */}
          <TableCell>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </TableCell>

          {/* Created */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Actions */}
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}