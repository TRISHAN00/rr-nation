import { TableCell, TableRow } from "@/app/components/ui/table";

export default function NoFound() {
  return (
    <TableRow>
          <TableCell colSpan={9} className="text-center py-10">
            No organizers found.
          </TableCell>
        </TableRow>
  )
}
