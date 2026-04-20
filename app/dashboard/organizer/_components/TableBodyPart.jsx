
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
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
  TableBody,
  TableCell,
  TableRow
} from "@/app/components/ui/table";
import { formatDate } from "@/lib/dateFormat";
import {
  Building2,
  CheckCircle,
  Edit,
  Eye,
  Globe,
  MoreHorizontal,
  XCircle
} from "lucide-react";
import SwitchStatusBadge from "./SwitchStatusBadge";


export default function TableBodyPart({ loading, data }) {
  return (
    <TableBody>
      {loading ? (
        // You can replace this with your MemberListSkeleton if imported
        <TableRow><TableCell colSpan={9} className="text-center py-10">Loading organizers...</TableCell></TableRow>
      ) : data.length === 0 ? (
        <TableRow><TableCell colSpan={9} className="text-center py-10">No organizers found.</TableCell></TableRow>
      ) : (
        data.map((item) => (
          <TableRow
            key={item.id}
            className="text-[12px] hover:bg-muted/30"
          >
            {/* Org ID */}
            <TableCell className="font-bold text-primary">
              #{item.id.toString().padStart(4, '0')}
            </TableCell>

            {/* Organization Details */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border shadow-sm rounded-md">
                  <AvatarImage src={item.organizationLogo} />
                  <AvatarFallback className="rounded-md">
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{item.organizationName}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{item.organizationType}</span>
                </div>
              </div>
            </TableCell>

            {/* Representative */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{item.primaryRepresentative}</span>
                <span className="text-muted-foreground">{item.officialEmail}</span>
              </div>
            </TableCell>

            {/* Registration Info */}
            <TableCell>
              <div className="text-[11px] space-y-0.5">
                <p><span className="text-muted-foreground">Reg:</span> {item.registrationNumber}</p>
                <p><span className="text-muted-foreground">TIN:</span> {item.tinNumber}</p>
              </div>
            </TableCell>

            {/* Bank Info */}
            <TableCell>
              <div className="text-[11px]">
                <p className="font-semibold">{item.bankName}</p>
                <p className="text-muted-foreground">{item.bankAccountNumber}</p>
              </div>
            </TableCell>

            {/* Events */}
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-primary">{item.totalEventsOrganized} Events</span>
                <span className="text-[10px] text-muted-foreground">{item.averageParticipantSize}</span>
              </div>
            </TableCell>

            {/* Approval Status */}
            <TableCell>
              <Badge
                className={`text-[9px] h-4 px-1.5 uppercase ${SwitchStatusBadge(item.adminApproval)}`}
              >
                {item.adminApproval}
              </Badge>
            </TableCell>

            {/* Created Date */}
            <TableCell className="text-muted-foreground">
              {formatDate(item.createdAt)}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
                  onClick={() => onAction(item, "edit")}
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
                    <DropdownMenuItem onClick={() => onAction(item, "view")}>
                      <Eye className="mr-2 h-3.5 w-3.5" /> Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(item.socialMediaLink, '_blank')}>
                      <Globe className="mr-2 h-3.5 w-3.5" /> Social Link
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
  )
}
