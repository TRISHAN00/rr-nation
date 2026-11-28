"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import OrgSearch from "./OrgSearch";

export default function OrganizerActions({
  search,
  onSearchChange,
  adminApproval,
  onAdminApprovalChange,
}) {
  return (
    <div className="p-4 bg-card border rounded-xl space-y-4 my-4">
      <div className="flex flex-col md:flex-row justify-between w-full gap-4">
        <OrgSearch value={search} onChange={onSearchChange} />

        <Select value={adminApproval} onValueChange={onAdminApprovalChange}>
          <SelectTrigger className="h-10 w-full md:w-48 bg-muted/20 border-muted">
            <SelectValue placeholder="Approval Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Approvals</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
