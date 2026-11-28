import { TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

export default function OrganizerTicketTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-14">#</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Distance</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Slots</TableHead>
        <TableHead>Used</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
