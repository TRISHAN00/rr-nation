"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  Eye,
  Facebook,
  MapPin,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { MemberListSkeleton } from "./MemberSkeleton";

export default function MemberList({
  members = [],
  handleViewDetails,
  loading,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const getPaymentBadge = (status) => {
    const styles = {
      pending: "bg-amber-500/10 text-amber-600 border-amber-200",
      paid: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      cancelled: "bg-rose-500/10 text-rose-600 border-rose-200",
    };
    return styles[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">
                Member & Reg. Date
              </TableHead>
              <TableHead className="font-semibold">Type & Event</TableHead>
              <TableHead className="font-semibold">
                Occupation & Skills
              </TableHead>
              <TableHead className="font-semibold">Payment Details</TableHead>
              <TableHead className="font-semibold">
                Location & T-Shirt
              </TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <MemberListSkeleton rowCount={8} />
            ) : members.length > 0 ? (
              members.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* 1. ID, Name & CreatedAt */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={item.user?.image} />
                        <AvatarFallback>
                          {item.user?.firstName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-none mb-1">
                          {item.user?.firstName} {item.user?.lastName ?? ""}
                        </p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* 2. Member Type & Event Type */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] h-4 uppercase px-1"
                      >
                        {item.memberType}
                      </Badge>
                      <span className="text-sm font-medium text-primary">
                        {item.eventType}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Exp: {item.eventsParticipatedNumber}
                      </span>
                    </div>
                  </TableCell>

                  {/* 3. Occupation & Skills & FB */}
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{item.occupation}</p>
                      <p className="text-[11px] text-muted-foreground italic">
                        {item.specialSkill}
                      </p>
                      {item.facebookLink && (
                        <a
                          href={item.facebookLink}
                          target="_blank"
                          className="mt-1 inline-block"
                        >
                          <Facebook color="#1877F2 " className="h-3 w-3 " />
                        </a>
                      )}
                    </div>
                  </TableCell>

                  {/* 4. Payment, Gateway & Discount */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        className={`h-5 text-[10px] justify-center ${getPaymentBadge(item.paymentStatus)}`}
                      >
                        {item.paymentStatus.toUpperCase()}
                      </Badge>
                      <div className="text-[10px] space-y-0.5">
                        <p className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />{" "}
                          {item.paymentGateway}
                        </p>
                        {item.discountAmount > 0 && (
                          <p className="text-emerald-600 font-medium">
                            Disc: ৳{item.discountAmount}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* 5. District & Address & T-Shirt */}
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />{" "}
                        {item.district}
                      </p>
                      <p
                        className="text-[10px] text-muted-foreground truncate max-w-[120px]"
                        title={item.deliveryAddress}
                      >
                        {item.deliveryAddress}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-1 text-[10px] h-4"
                      >
                        Size: {item.tShirtSize}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* 6. Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Manage Member</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(item)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-emerald-600">
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">
                          <XCircle className="mr-2 h-4 w-4" /> Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  No matches found for "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
