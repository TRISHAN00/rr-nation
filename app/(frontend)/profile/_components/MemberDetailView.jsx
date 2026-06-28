"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { CreditCard, Gift, MessageCircle, Trophy, User, UserPlus } from "lucide-react";
import Link from "next/link";
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
  const hasData = Object.keys(profile).length > 0;

  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DUkNdmvMZFAJaTbt5bBjq0?s=cl&p=i&ilr=2";

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-muted last:border-0 hover:bg-muted/30 px-2 rounded-md transition-colors">
      <span className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-xs sm:text-sm text-foreground font-semibold truncate max-w-45 sm:max-w-xs text-right">
        {value ?? "N/A"}
      </span>
    </div>
  );

  if (!hasData) {
    return (
      <div className="mt-6 w-full mx-auto">
        <Card className="border-muted/70 shadow-md rounded-xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-brand/10 mb-6">
              <Gift className="h-12 w-12 text-brand" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Membership Found</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-8">
              You haven&apos;t registered as a member yet. Become a member to unlock exclusive benefits, training sessions, event discounts, and more.
            </p>
            <Link href="/member-register">
              <Button size="lg" className="gap-2 text-sm font-bold shadow-lg">
                <UserPlus className="h-5 w-5" /> Become a Member
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full mx-auto">
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

        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none focus-visible:ring-0 mt-0">
          <Card className="border-muted/70 shadow-md backdrop-blur-sm bg-card/90 rounded-xl overflow-hidden">
            <CardHeader className="pb-4 bg-muted/10 border-b border-muted/40">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground">Member Profile Details</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage details and basic subscription registration records.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 bg-background rounded-md shadow-sm">
                      {MEMBER_TYPE_LABELS[profile.memberType] || profile.memberType || "N/A"}
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

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-primary/20 pb-1.5">
                  Personal Info
                </h4>
                <div className="space-y-0.5">
                  {profile.registrationNumber && <DataRow label="Member ID" value={profile.registrationNumber} />}
                  {profile.gender && <DataRow label="Gender" value={profile.gender} />}
                  {profile.bloodGroup && <DataRow label="Blood Group" value={profile.bloodGroup} />}
                  {profile.age && <DataRow label="Age" value={`${profile.age} Years`} />}
                  {profile.phone && <DataRow label="Phone" value={profile.phone} />}
                  {profile.educationalQualification && <DataRow label="Education" value={profile.educationalQualification} />}
                  {profile.hscPassingYear && <DataRow label="HSC Passing Year" value={profile.hscPassingYear} />}
                  {profile.occupation && <DataRow label="Occupation" value={profile.occupation} />}
                  {profile.religion && <DataRow label="Religion" value={profile.religion} />}
                  {profile.specialSkill && <DataRow label="Special Skill" value={profile.specialSkill} />}
                  {profile.district && <DataRow label="District" value={profile.district} />}
                  {profile.deliveryAddress && <DataRow label="Delivery Address" value={profile.deliveryAddress} />}
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

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-primary/20 pb-1.5">
                  Event & Athletic Profile
                </h4>
                <div className="space-y-0.5">
                  {profile.eventType && <DataRow label="Event Type" value={profile.eventType} />}
                  {profile.preferableRunningDistance && (
                    <DataRow label="Target Distance" value={profile.preferableRunningDistance} />
                  )}
                  {profile.preferableEventLocation && <DataRow label="Preferred Location" value={profile.preferableEventLocation} />}
                  {profile.tShirtSize && <DataRow label="T-Shirt Size" value={profile.tShirtSize} />}
                  {profile.wantsToJoinTeam !== undefined && (
                    <DataRow label="Wants to Join Team" value={profile.wantsToJoinTeam ? "Yes" : "No"} />
                  )}
                  {profile.joinTeamReason && <DataRow label="Reason to Join Team" value={profile.joinTeamReason} />}
                  {profile.whyJoin && <DataRow label="Why Joined RRN" value={profile.whyJoin} />}
                  {profile.recommendationMessage && <DataRow label="Recommendations" value={profile.recommendationMessage} />}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
          <MemberEvents />
        </TabsContent>
      </Tabs>

      <MemPayModal open={open} setOpen={setOpen} memberId={profile.id} />
    </div>
  );
}
