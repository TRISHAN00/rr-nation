"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import OrgSearch from "./OrgSearch";

export default function OrganizerActions() {
  return (
    <div className="p-4 bg-card border rounded-xl space-y-4 my-4">
      {/* Filter Grid */}
      <div className="flex justify-between w-full gap-x-4">
        {/* 1. Search Box */}
        <OrgSearch />

        <div className="flex gap-x-2">
          {/* 2. Admin Approval Select */}
          <Select
            defaultValue="all"
      
          >
            <SelectTrigger className="h-10 w-40 bg-muted/20 border-muted">
              <SelectValue placeholder="Approval Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Approvals</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* 3. Member Type Select */}
          <Select
            defaultValue="all"
           
          >
            <SelectTrigger className="h-10 w-40 bg-muted/20 border-muted">
              <SelectValue placeholder="Member Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="advisor">Advisor</SelectItem>
              <SelectItem value="core_team">Core Team</SelectItem>
            </SelectContent>
          </Select>

          {/* 4. Payment Status Select */}
          <Select 
            defaultValue="all"
       
          >
            <SelectTrigger className="h-10 w-40 bg-muted/20 border-muted">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="pending">Pending Payment</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
