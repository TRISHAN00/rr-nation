import {
  TableHead,
  TableHeader,
  TableRow
} from "@/app/components/ui/table";
import { organizerTableHeaderData } from "../data/static";

export default function TableHeaderPart() {
  return (
    <TableHeader className="bg-muted/50 sticky top-0 z-10">
      <TableRow className="text-[10px] uppercase font-bold">
        {organizerTableHeaderData.map((item) => (
          <TableHead key={item.id} className={item.className || ""}>
            {item.title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}