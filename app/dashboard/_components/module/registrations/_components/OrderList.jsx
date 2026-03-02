"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Eye } from "lucide-react";
import { OrderListSkeleton } from "./Skeleton/OrderSkeleton";

export default function OrderList({
  registeredUsers,
  handleViewDetails,
  loading,
}) {
  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold text-foreground text-left">
                ID
              </TableHead>

              <TableHead className="font-semibold text-foreground text-left">
                Name
              </TableHead>

              <TableHead className="font-semibold text-foreground text-left">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-foreground text-left">
                Payment Date/Time
              </TableHead>

              <TableHead className="text-right font-semibold text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <OrderListSkeleton fieldCout={50} />
            ) : (
              registeredUsers?.map((reg) => {
                const firstLetter = reg?.user?.firstName?.charAt(0) || "";
                return (
                  <TableRow key={reg?.id}>
                    <TableCell>NR{reg?.user?.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={reg?.user?.image} />
                          <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                            {firstLetter}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">
                            {reg?.user?.firstName + " " + reg?.user?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {reg?.user?.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      ৳ {Math.ceil(reg?.afterDiscountAmount).toFixed() || "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(reg?.paymentDate).toLocaleString("en-BD", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(reg)}
                        className="h-8 border-border hover:bg-muted"
                      >
                        <Eye className="h-3.5 w-3.5 mr-2" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        {!loading && registeredUsers.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No registrations found on this page.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
