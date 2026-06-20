"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MessageCircle, Trophy, User } from "lucide-react";
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

  const profile = member?.data || {};
  const isPaid = profile.paymentStatus === "paid";

  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DUkNdmvMZFAJaTbt5bBjq0?s=cl&p=i&ilr=2";

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-muted last:border-0 hover:bg-muted/30 px-2 rounded-md transition-colors">
      <span className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-xs sm:text-sm text-foreground font-semibold truncate max-w-[180px] sm:max-w-xs text-right">
        {value ?? "N/A"}
      </span>
    </div>
  );

  return (
    <div className="mt-6 w-full mx-auto">
      {/* Tab Nav Controller Structure */}
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="border-b pb-1">
          <TabsList className="bg-muted/50 p-1 h-10 gap-1 rounded-lg">
            <TabsTrigger value="profile" className="text-xs font-medium gap-1.5 px-4 h-8 data-[state=active]:shadow-sm">
              <User className="h-3.5 w-3.5" /> Profile Info
            </TabsTrigger>
            {isPaid && (
              <TabsTrigger value="events" className="text-xs font-medium gap-1.5 px-4 h-8 data-[state=active]:shadow-sm">
                <Trophy className="h-3.5 w-3.5" /> My Events
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* TAB 1: PROFILE DETAILS INFO OVERLAY BLOCK */}
        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-muted/70 shadow-md backdrop-blur-sm bg-card/90 rounded-xl overflow-hidden">
            {/* HEADER DESIGN CONTROLS */}
            <CardHeader className="pb-4 bg-muted/10 border-b border-muted/40">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground">Member Profile Details</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage details and basic subscription registration records.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 bg-background rounded-md shadow-sm">
                      {MEMBER_TYPE_LABELS[profile.memberType] || "N/A"}
                    </Badge>
                    {profile.paymentStatus && (
                      <Badge
                        variant={isPaid ? "default" : "destructive"}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md shadow-none"
                      >
                        {PAYMENT_STATUS_LABELS[profile.paymentStatus]}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {!isPaid && (
                      <Button size="sm" onClick={() => setOpen(true)} className="w-full sm:w-auto text-xs font-medium shadow-sm gap-1.5">
                        <CreditCard className="h-3.5 w-3.5" /> Make Payment
                      </Button>
                    )}

                    {isPaid && (
                      <Button
                        size="sm"
                        className="w-full sm:w-auto text-xs font-semibold shadow-sm gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all active:scale-[0.98]"
                        onClick={() => window.open(WHATSAPP_GROUP_LINK, "_blank", "noopener,noreferrer")}
                      >
                        <MessageCircle className="h-3.5 w-3.5 fill-white/20 animate-pulse" /> Join WhatsApp Group
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* TWO COLUMN SUMMARY CONTENT SHEET */}
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-6">
              {/* Personal Info Grid Box */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-primary/20 pb-1.5">
                  Personal Info
                </h4>
                <div className="space-y-0.5">
                  {profile.registrationNumber && <DataRow label="Registration ID" value={profile.registrationNumber} />}
                  {profile.age && <DataRow label="Age" value={`${profile.age} Years`} />}
                  {profile.occupation && <DataRow label="Occupation" value={profile.occupation} />}
                  {profile.specialSkill && <DataRow label="Special Skill" value={profile.specialSkill} />}
                  {profile.district && <DataRow label="District" value={profile.district} />}
                  {profile.facebookLink && (
                    <div className="flex justify-between items-center py-3 border-b border-muted last:border-0 hover:bg-muted/30 px-2 rounded-md transition-colors">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Facebook</span>
                      <a 
                        href={profile.facebookLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs sm:text-sm text-blue-600 hover:underline font-semibold max-w-[180px] sm:max-w-xs truncate"
                      >
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Running Specific Event Metrics */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-primary/20 pb-1.5">
                  Event Data
                </h4>
                <div className="space-y-0.5">
                  {profile.eventType && <DataRow label="Event Type" value={profile.eventType} />}
                  {profile.preferableRunningDistance && (
                    <DataRow label="Target Distance" value={`${profile.preferableRunningDistance} km`} />
                  )}
                  {profile.tShirtSize && <DataRow label="T-Shirt Size" value={profile.tShirtSize} />}
                  {profile.eventsParticipatedNumber !== undefined && (
                    <DataRow label="Past Participations" value={profile.eventsParticipatedNumber} />
                  )}
                  <DataRow label="Event Staff" value={profile.isEventStaff ? "Yes" : "No"} />
                </div>
              </div>
            </CardContent>

            <Separator className="opacity-60" />

            {/* FOOTER METADATA ZONE */}
            <CardContent className="py-4 bg-muted/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
                {profile?.paymentGateway && <DataRow label="Gateway" value={profile.paymentGateway} />}
                {profile?.currency && <DataRow label="Currency" value={profile.currency} />}
                {profile?.adminApproval && <DataRow label="Admin Approval" value={profile.adminApproval} />}
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
      <MemPayModal open={open} setOpen={setOpen} memberId={profile.id} />
    </div>
  );
}