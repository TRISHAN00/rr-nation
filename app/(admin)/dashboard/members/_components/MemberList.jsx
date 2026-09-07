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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  loading,
  onAction,
  onViewDetails,
  onEdit,
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
    <TooltipProvider>
    <Card className="border-border bg-card shadow-sm overflow-x-auto custom-scrollbar">
      <CardContent className="p-0">
        {/* Reduced min-width from 1750px to 1100px for better monitor responsiveness */}
        <Table className="min-w-[1100px]">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow className="text-[11px] uppercase font-bold">
              <TableHead>Name & ID</TableHead>
              <TableHead>Reg. Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Admin Approval</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <MemberListSkeleton rowCount={10} />
            ) : (
              members.map((item) => {
                console.log(item?.adminApproval)
                return (
                  <TableRow
                    key={item.id}
                    className="text-[13px] hover:bg-muted/30"
                  >
                    {/* COMPACT MEMBER PROFILE */}
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2.5 cursor-default">
                            <Avatar className="h-8 w-8 border shadow-sm shrink-0">
                              <AvatarImage src={item.memberImage} />
                              <AvatarFallback className="text-[11px]">
                                <User className="h-3.5 w-3.5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-foreground truncate max-w-[140px]">
                                {item.user?.firstName} {item.user?.lastName}
                              </span>
                              <span className="text-[11px] font-mono font-bold text-primary">
                                {item.registrationNumber}
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p>{item.user?.firstName} {item.user?.lastName}</p>
                          <p className="text-muted-foreground">{item.registrationNumber}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>

                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase h-5 px-1.5 font-medium cursor-default"
                          >
                            {item.memberType}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Member Type: {item.memberType}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-medium text-muted-foreground">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{item.phone}</span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {item.phone}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-muted-foreground max-w-[180px] truncate">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{item.user?.email || '—'}</span>
                        </TooltipTrigger>
                        {item.user?.email && (
                          <TooltipContent side="top" className="text-xs">
                            {item.user?.email}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TableCell>

                    {/* PAYMENT DETAILS */}
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-col gap-0.5 cursor-default">
                            <Badge
                              className={`text-[10px] h-5 px-1.5 w-fit font-bold uppercase ${getStatusBadge(item.paymentStatus)}`}
                            >
                              {item.paymentStatus}
                            </Badge>
                            {item.paymentStatus === "paid" && item.paymentDate && (
                              <span className="text-[11px] text-muted-foreground font-medium pl-0.5">
                                {formatDate(item.paymentDate)}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p>Status: {item.paymentStatus}</p>
                          {item.paymentStatus === "paid" && item.paymentDate && (
                            <p className="text-muted-foreground">Paid on: {formatDate(item.paymentDate)}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell className="font-bold text-emerald-600">
                      ৳{item.afterDiscountAmount || 0}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`text-[10px] h-5 px-1.5 font-bold uppercase ${getStatusBadge(item.adminApproval)}`}
                      >
                        {item.adminApproval}
                      </Badge>
                    </TableCell>

                    {/* ACTIONS DROP-DOWN */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
                          onClick={() => onEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

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
                            <DropdownMenuLabel className="text-[11px] text-muted-foreground">
                              Quick Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => onViewDetails(item)}
                            >
                              <Eye className="mr-2 h-3.5 w-3.5" /> Details
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            {item.adminApproval !== "approved" && (
                              <DropdownMenuItem
                                onClick={() => onAction(item, "approve")}
                                className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 font-medium"
                              >
                                <CheckCircle className="mr-2 h-3.5 w-3.5" /> Approve
                              </DropdownMenuItem>
                            )}
                            {item.adminApproval !== "rejected" && (
                              <DropdownMenuItem
                                onClick={() => onAction(item, "reject")}
                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 font-medium"
                              >
                                <XCircle className="mr-2 h-3.5 w-3.5" /> Reject
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}