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
import { Badge } from "@/app/components/ui/badge";
import { Eye, Hash } from "lucide-react";
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
              <TableHead className="font-semibold text-foreground text-left">ID</TableHead>
              <TableHead className="font-semibold text-foreground text-left">User</TableHead>
              <TableHead className="font-semibold text-foreground text-left">Event / Ticket</TableHead>
              <TableHead className="font-semibold text-foreground text-left">BIB</TableHead>
              <TableHead className="font-semibold text-foreground text-left">Tracking</TableHead>
              <TableHead className="font-semibold text-foreground text-left">Coupon</TableHead>
              <TableHead className="font-semibold text-foreground text-left">Amount</TableHead>
              <TableHead className="font-semibold text-foreground text-left">Payment Date/Time</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <OrderListSkeleton fieldCout={50} />
            ) : (
              registeredUsers?.map((reg) => {
                const firstLetter = reg?.user?.firstName?.charAt(0) || "";
                const eventName =
                  reg?.order?.items?.[0]?.eventTicket?.event?.name;
                const itemCount = reg?.order?.items?.length || 0;
                const items = reg?.order?.items || [];

                const getBadgeColor = (count) => {
                  switch (count) {
                    case 1: return "bg-blue-500";
                    case 2: return "bg-emerald-500";
                    case 3: return "bg-amber-500";
                    case 4: return "bg-rose-500";
                    default: return "bg-brand";
                  }
                };

                const allBibs = items.filter((i) => i.bib);
                const trackingValues = [
                  ...new Set(allBibs.map((i) => i.bib.tracking).filter(Boolean)),
                ];

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
                            {reg?.user?.firstName} {reg?.user?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {reg?.user?.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate max-w-[160px]">{eventName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded text-white ${getBadgeColor(itemCount)}`}>
                          {itemCount}
                        </span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {items.map((item, idx) => (
                          <div key={idx} className="text-[10px] text-muted-foreground">
                            {item.eventTicket?.name || `Item ${idx + 1}`}
                          </div>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      {allBibs.length > 0 ? (
                        <div className="space-y-1.5">
                          {allBibs.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <Hash className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="text-xs font-semibold">{item.bib.bibNumber}</span>
                              <Badge className={`text-[8px] h-4 px-1 font-bold uppercase ${
                                item.bib.adminApproval === "approved" ? "bg-emerald-500" :
                                item.bib.adminApproval === "pending" ? "bg-amber-500" :
                                "bg-red-500"
                              }`}>
                                {item.bib.adminApproval}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {trackingValues.length > 0 ? (
                        <div className="space-y-0.5">
                          {trackingValues.map((t, i) => (
                            <div key={i} className="text-[10px] text-muted-foreground max-w-[140px] truncate" title={t}>
                              {t}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {reg?.dicountCoupon?.code
                        ? reg?.dicountCoupon?.code
                        : "N/A"}
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
