import { TableCell, TableRow } from "@/app/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function UserListSkeleton({numberOfRow}) {
  return (
    <>
      {[...Array(numberOfRow)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </TableCell>
          <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
          <TableCell><Skeleton className="h-5 w-[60px] rounded-full" /></TableCell>
          <TableCell className="text-right"><Skeleton className="h-4 w-[30px] ml-auto" /></TableCell>
        </TableRow>
      ))}
    </>
  );
}