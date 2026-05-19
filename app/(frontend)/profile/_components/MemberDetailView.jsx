"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Trophy, User } from "lucide-react";
import { useState } from "react";
import MemPayModal from "./MemPayModal";
import MemberEvents from "./MemberEvents";

const MEMBER_TYPE_LABELS = {
  premium: "Premium Member",
  basic: "Basic Member",
};

const PAYMENT_STATUS_LABELS = {
  paid: "Payment Completed",
  pending: "Payment Pending",
  failed: "Payment Failed",
};

export default function MemberDetailView({ member }) {
  const [open, setOpen] = useState(false);

  const isPaid = member?.data?.paymentStatus === "paid";

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between py-2.5 border-b border-muted last:border-0 hover:bg-muted/10 px-1 transition-colors">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-sm text-foreground font-semibold">{value ?? "N/A"}</span>
    </div>
  );

  return (
    <div className="mt-6 w-full  mx-auto">
      {/* Tab Nav Controller Structure */}
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="border-b pb-1">
          <TabsList className="bg-muted/50 p-1 h-10 gap-1 rounded-lg">
            <TabsTrigger value="profile" className="text-xs font-medium gap-1.5 px-4 h-8 data-[state=active]:shadow-sm">
              <User className="h-3.5 w-3.5" /> Profile Info
            </TabsTrigger>
            {
              isPaid && <TabsTrigger value="events" className="text-xs font-medium gap-1.5 px-4 h-8 data-[state=active]:shadow-sm">
                <Trophy className="h-3.5 w-3.5" /> My Events
              </TabsTrigger>
            }

          </TabsList>
        </div>

        {/* TAB 1: PROFILE DETAILS INFO OVERLAY BLOCK */}
        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-muted shadow-sm">
            {/* HEADER DESIGN CONTROLS */}
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg font-bold tracking-tight">Member Profile Details</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage details and basic subscription registration records.</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5 rounded-md">
                      {MEMBER_TYPE_LABELS[member?.data?.memberType] || "N/A"}
                    </Badge>
                    <Badge
                      variant={isPaid ? "default" : "destructive"}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-md shadow-none"
                    >
                      {PAYMENT_STATUS_LABELS[member?.data?.paymentStatus] || "Unknown"}
                    </Badge>
                  </div>

                  {!isPaid && (
                    <Button size="sm" onClick={() => setOpen(true)} className="text-xs font-medium shadow-sm gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" /> Make Payment
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* TWO COLUMN SUMMARY CONTENT SHEET */}
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2">
              {/* Personal Info Grid Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b pb-1">
                  Personal Info
                </h4>
                <div className="space-y-1">
                  <DataRow label="Registration ID" value={member?.data?.registrationNumber} />
                  <DataRow label="Age" value={member?.data?.age} />
                  <DataRow label="Occupation" value={member?.data?.occupation} />
                  <DataRow label="Special Skill" value={member?.data?.specialSkill} />
                  <DataRow label="District" value={member?.data?.district} />
                  <DataRow label="Facebook" value={member?.data?.facebookLink} />
                </div>
              </div>

              {/* Running Specific Event Metrics */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b pb-1">
                  Event Data
                </h4>
                <div className="space-y-1">
                  <DataRow label="Event Type" value={member?.data?.eventType} />
                  <DataRow
                    label="Target Distance"
                    value={
                      member?.data?.preferableRunningDistance
                        ? `${member?.data?.preferableRunningDistance} km`
                        : "N/A"
                    }
                  />
                  <DataRow label="T-Shirt Size" value={member?.data?.tShirtSize} />
                  <DataRow label="Past Participations" value={member?.data?.eventsParticipatedNumber} />
                  <DataRow label="Event Staff" value={member?.data?.isEventStaff ? "Yes" : "No"} />
                </div>
              </div>
            </CardContent>

            <Separator />

            {/* FOOTER METADATA ZONE */}
            <CardContent className="py-4 bg-muted/20 rounded-b-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2">
                <DataRow label="Gateway" value={member?.data?.paymentGateway} />
                <DataRow label="Currency" value={member?.data?.currency} />
                <DataRow label="Admin Approval" value={member?.data?.adminApproval} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: COMPLETED RUNS HISTORY TABLE COMPONENT */}
        <TabsContent value="events" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
          <MemberEvents />
        </TabsContent>
      </Tabs>

      {/* Payment handling modal utility layer */}
      <MemPayModal open={open} setOpen={setOpen} memberId={member?.data?.id} />
    </div>
  );
}