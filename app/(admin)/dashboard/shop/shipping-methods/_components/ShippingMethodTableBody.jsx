"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export default function ShippingMethodTableBody({ loading, methods, onEdit, onDelete }) {
  if (loading) {
    return (
      <TableBody>
        {Array.from({ length: 4 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}><div className="h-4 bg-muted/50 rounded animate-pulse" /></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {methods?.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-semibold">{item.name}</TableCell>
          <TableCell className="font-mono text-sm">{item.code}</TableCell>
          <TableCell>৳{Number(item.baseFee).toFixed(2)}</TableCell>
          <TableCell>৳{Number(item.discountAmount).toFixed(2)}</TableCell>
          <TableCell>{item.estimatedDeliveryDays} days</TableCell>
          <TableCell>{item.sortOrder}</TableCell>
          <TableCell>
            <Badge variant={item.isActive ? "default" : "secondary"}>
              {item.isActive ? "Active" : "Inactive"}
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
