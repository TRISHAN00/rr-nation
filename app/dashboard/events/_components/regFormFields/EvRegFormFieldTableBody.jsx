"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { Asterisk, Pencil, Trash2 } from "lucide-react";

export default function EvRegFormFieldTableBody({ 
    loading, 
    fields, // This is the 'data' array from your JSON
    onRefresh,
}) {
    return (
        <TableBody>
            {loading ? (
                /* Loading State: Adjust colSpan to 7 to match your header count */
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        Loading registration fields...
                    </TableCell>
                </TableRow>
            ) : (
                fields?.map((field, index) => (
                    <TableRow key={field.id}>
                        {/* 1. # (Serial Number) */}
                        <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                        </TableCell>

                        {/* 2. Field Label (+ Required Indicator) */}
                        <TableCell className="font-semibold capitalize">
                            <div className="flex items-center gap-1">
                                {field.label}
                                {field.required && (
                                    <Asterisk 
                                        className="h-3 w-3 text-destructive" 
                                        strokeWidth={3} 
                                    />
                                )}
                            </div>
                        </TableCell>

                        {/* 3. Type */}
                        <TableCell>
                            <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                                {field.type}
                            </Badge>
                        </TableCell>

                        {/* 4. Placeholder */}
                        <TableCell className="text-muted-foreground italic max-w-[200px] truncate">
                            {field.placeholder || "No placeholder"}
                        </TableCell>

                        {/* 5. Order */}
                        <TableCell>
                            <span className="bg-secondary px-2 py-1 rounded text-xs font-mono">
                                {field.order}
                            </span>
                        </TableCell>

                        {/* 6. Status */}
                        <TableCell>
                            <Badge variant={field.isActive ? "default" : "secondary"}>
                                {field.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </TableCell>

                        {/* 7. Actions */}
                        <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {/* Edit */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    {/* Delete */}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDeleteClick(coupon)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    );
}