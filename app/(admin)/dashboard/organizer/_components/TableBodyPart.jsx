
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/app/components/ui/table";
import { formatDate } from "@/lib/dateFormat";
import { Building2, Loader2 } from "lucide-react";
import NoFound from "../../_components/NoFound";
import SwitchStatusBadge from "./SwitchStatusBadge";
import TableItemActionDrop from "./TableItemActionDrop";

export default function TableBodyPart({ loading, data, onAction, onView }) {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={9} className="text-center py-10">
            <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
          </TableCell>
        </TableRow>
      ) : data.length === 0 ? (
        <NoFound text={"No organizers found."} />
      ) : (
        data.map((item) => (
          <TableRow key={item.id} className="text-[12px] hover:bg-muted/30">
            <TableCell className="font-bold text-primary">
              #{String(item.id).padStart(4, "0")}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border shadow-sm rounded-md">
                  <AvatarImage src={item.organizationLogo} />
                  <AvatarFallback className="rounded-md">
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{item.organizationName || "-"}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{item.organizationType || "-"}</span>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{item.primaryRepresentative || "-"}</span>
                <span className="text-muted-foreground">{item.officialEmail || "-"}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="text-[11px] space-y-0.5">
                <p><span className="text-muted-foreground">Reg:</span> {item.registrationNumber || "-"}</p>
                <p><span className="text-muted-foreground">TIN:</span> {item.tinNumber || "-"}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="text-[11px]">
                <p className="font-semibold">{item.bankName || "-"}</p>
                <p className="text-muted-foreground">{item.bankAccountNumber || "-"}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-primary">{item.totalEventsOrganized ?? 0} Events</span>
                <span className="text-[10px] text-muted-foreground">{item.averageParticipantSize || "-"}</span>
              </div>
            </TableCell>

            <TableCell>
              <Badge className={`text-[9px] h-4 px-1.5 uppercase ${SwitchStatusBadge(item.adminApproval)}`}>
                {item.adminApproval || "pending"}
              </Badge>
            </TableCell>

            <TableCell className="text-muted-foreground">
              {item.createdAt ? formatDate(item.createdAt) : "-"}
            </TableCell>

            <TableItemActionDrop item={item} onAction={onAction} onView={onView} />
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
