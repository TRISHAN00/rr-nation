"use client";

import { TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

export default function CouponTableHeader() {
  return (
    <TableHeader className="bg-muted/50">
      <TableRow className="text-[11px] uppercase font-bold">
        <TableHead>Code</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Value</TableHead>
        <TableHead>Usage</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Created</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
