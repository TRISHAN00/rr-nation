"use client";

import { TableCell, TableRow } from "@/app/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function MemberListSkeleton({ rowCount = 10 }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          {/* 1. ID & Member Info */}
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>
          </TableCell>

          {/* 2. Age & Type */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-16 rounded-full" />
            </div>
          </TableCell>

          {/* 3. Event Info */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-24" />
            </div>
          </TableCell>

          {/* 4. Occupation & Social */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <div className="flex gap-2">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
            </div>
          </TableCell>

          {/* 5. Location & T-Shirt */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2 w-12" />
            </div>
          </TableCell>

          {/* 6. Status */}
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </TableCell>

          {/* 7. Distance */}
          <TableCell className="text-right">
            <div className="flex justify-end">
              <Skeleton className="h-4 w-10" />
            </div>
          </TableCell>

          {/* 8. Action */}
          <TableCell className="text-right">
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}