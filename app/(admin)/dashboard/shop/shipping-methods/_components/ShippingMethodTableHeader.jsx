"use client";

import { TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

export default function ShippingMethodTableHeader() {
  return (
    <TableHeader className="bg-muted/50">
      <TableRow className="text-[11px] uppercase font-bold">
        <TableHead>Name</TableHead>
        <TableHead>Code</TableHead>
        <TableHead>Base Fee</TableHead>
        <TableHead>Discount</TableHead>
        <TableHead>Est. Days</TableHead>
        <TableHead>Sort</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
