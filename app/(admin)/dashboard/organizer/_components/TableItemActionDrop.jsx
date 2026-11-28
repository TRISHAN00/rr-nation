import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { TableCell } from "@/app/components/ui/table";
import { CheckCircle, Eye, Globe, MoreHorizontal, XCircle } from "lucide-react";

export default function TableItemActionDrop({ item, onAction, onView }) {
  const status = String(item?.adminApproval || "pending").toLowerCase();
  const canApprove = status !== "approved";
  const canReject = status !== "rejected";
  const hasStatusActions = canApprove || canReject;

  return (
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-xs">
          <DropdownMenuLabel className="text-[10px] text-muted-foreground">
            Management
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView?.(item)}>
            <Eye className="mr-2 h-3.5 w-3.5" /> View Details
          </DropdownMenuItem>
          {item.socialMediaLink && (
            <DropdownMenuItem onClick={() => window.open(item.socialMediaLink, "_blank")}>
              <Globe className="mr-2 h-3.5 w-3.5" /> Social Link
            </DropdownMenuItem>
          )}
          {hasStatusActions && <DropdownMenuSeparator />}
          {canApprove && (
            <DropdownMenuItem
              onClick={() => onAction?.(item, "approved")}
              className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
            >
              <CheckCircle className="mr-2 h-3.5 w-3.5" /> Approve
            </DropdownMenuItem>
          )}
          {canReject && (
            <DropdownMenuItem
              onClick={() => onAction?.(item, "rejected")}
              className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
            >
              <XCircle className="mr-2 h-3.5 w-3.5" /> Reject
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}
