import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import {
  TableCell
} from "@/app/components/ui/table";
import {
  CheckCircle,
  Edit,
  Eye,
  Globe,
  MoreHorizontal,
  XCircle
} from "lucide-react";

export default function TableItemActionDrop({ item }) {
  const handleAprove = (item, action) => {
    console.log("Action:", item, action);
  }
  return (
    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
          onClick={() => handleAprove(item, "edit")}
        >
          <Edit className="h-4 w-4" />
        </Button>

        {/* Action Management  */}
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
            <DropdownMenuItem onClick={() => handleAprove(item, "view")}>
              <Eye className="mr-2 h-3.5 w-3.5" /> Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(item.socialMediaLink, '_blank')}>
              <Globe className="mr-2 h-3.5 w-3.5" /> Social Link
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleAprove(item, "approve")}
              className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
            >
              <CheckCircle className="mr-2 h-3.5 w-3.5" /> Approve
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleAprove(item, "reject")}
              className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
            >
              <XCircle className="mr-2 h-3.5 w-3.5" /> Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  )
}
