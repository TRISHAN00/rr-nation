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
  DropdownMenuTrigger
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
  CheckCircle,
  Edit,
  Eye,
  MoreHorizontal,
  User,
  XCircle,
} from "lucide-react";
import { MemberListSkeleton } from "./MemberSkeleton";

export default function MemberList({
  members = [],
  handleViewDetails,
  loading,
  onAction,
}) {
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    /* Added custom-scrollbar here */
    <Card className="border-border bg-card shadow-sm overflow-x-auto custom-scrollbar">
      <CardContent className="p-0">
        <Table className="min-w-[1750px]">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow className="text-[10px] uppercase font-bold">
              <TableHead className="w-[100px]">Reg. No</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>District</TableHead>
              <TableHead>T-Shirt</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <MemberListSkeleton rowCount={10} />
            ) : (
              members.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[12px] hover:bg-muted/30"
                >
                  <TableCell className="font-bold text-primary">
                    {item.registrationNumber}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border shadow-sm">
                        <AvatarImage src={item.user?.image} />
                        <AvatarFallback className="text-[10px]">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium truncate max-w-[110px]">
                        {item.user?.firstName} {item.user?.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-[9px] uppercase h-4 px-1"
                    >
                      {item.memberType}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.eventType}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.preferableRunningDistance} KM
                  </TableCell>
                  <TableCell className="truncate max-w-[100px]">
                    {item.occupation}
                  </TableCell>
                  <TableCell>{item.district}</TableCell>
                  <TableCell className="font-bold text-center">
                    {item.tShirtSize}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[9px] h-4 px-1.5 ${getStatusBadge(item.paymentStatus)}`}
                    >
                      {item.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {item.paymentStatus === "paid"
                      ? formatDate(item.paymentDate)
                      : "—"}
                  </TableCell>
                  <TableCell className="font-bold text-emerald-600">
                    ৳{item.afterDiscountAmount || 0}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[9px] h-4 px-1.5 ${getStatusBadge(item.adminApproval)}`}
                    >
                      {item.adminApproval}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* 1. Quick Edit Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
                        onClick={() => onAction(item, "edit")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* 2. More Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs">
                          <DropdownMenuLabel className="text-[10px] text-muted-foreground">
                            Quick Actions
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye className="mr-2 h-3.5 w-3.5" /> Details
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onAction(item, "approve")}
                            className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
                          >
                            <CheckCircle className="mr-2 h-3.5 w-3.5" /> Approve
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onAction(item, "reject")}
                            className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                          >
                            <XCircle className="mr-2 h-3.5 w-3.5" /> Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
