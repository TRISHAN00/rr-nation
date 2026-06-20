"use client";

import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  AlertCircle, Award, Briefcase, Calendar, CreditCard,
  DollarSign, ExternalLink, Facebook, Hash, Heart, Mail,
  MapPin, MessageSquare, Phone, Ruler, ShieldAlert, Shirt,
  Star, User
} from "lucide-react";
import Image from "next/image";

// Helper component for attributes grid rows
function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      <div className="space-y-0.5 w-full min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="font-semibold text-foreground break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

// Helper component for section headers
function SectionTitle({ title }) {
  return (
    <h4 className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded w-fit mb-2 mt-4">
      {title}
    </h4>
  );
}

export default function MemberDetailsSheet({ isOpen, onOpenChange, selectedMember }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full bg-card border-l border-border overflow-y-auto p-0 flex flex-col h-full shadow-2xl">
        {selectedMember ? (
          <>
            {/* 1. Hero / Header Panel */}
            <div className="relative pt-8 pb-6 px-6 bg-gradient-to-b from-primary/10 to-transparent flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-lg mb-4 bg-muted flex items-center justify-center">
                {selectedMember.memberImage ? (
                  <Image
                    src={selectedMember.memberImage}
                    alt={selectedMember.name || "Member Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              <SheetHeader className="space-y-1 w-full">
                <SheetTitle className="text-xl font-extrabold tracking-tight text-foreground">
                  {selectedMember.name}
                </SheetTitle>
                {
                  selectedMember.registrationNumber && <SheetDescription className="text-xs font-medium text-muted-foreground flex items-center justify-center gap-1.5">
                    Member ID: <span className="font-mono text-foreground font-bold">{selectedMember.registrationNumber}</span>
                  </SheetDescription>
                }

              </SheetHeader>

              {/* Status Badges Row */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <Badge className="uppercase font-bold text-[10px] tracking-wider px-2.5 py-0.5" variant="secondary">
                  {selectedMember.memberType || "Member"}
                </Badge>

                <Badge
                  className={`uppercase font-bold text-[10px] tracking-wider px-2.5 py-0.5 text-white border-none ${selectedMember.adminApproval === "approved" ? "bg-emerald-600" : "bg-amber-500"
                    }`}
                >
                  Approval: {selectedMember.adminApproval || "Pending"}
                </Badge>

                <Badge
                  className={`uppercase font-bold text-[10px] tracking-wider px-2.5 py-0.5 text-white border-none ${selectedMember.paymentStatus === "success" || selectedMember.paymentStatus === "paid"
                    ? "bg-emerald-600"
                    : "bg-rose-500"
                    }`}
                >
                  Payment: {selectedMember.paymentStatus || "Pending"}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* 2. Scrollable Meta Attributes List */}
            <div className="flex-1 px-6 py-4 space-y-5">
              {/* Section A: Core Account Identity */}
              <div>
                <SectionTitle title="Account & User Bindings" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 border border-border/60 p-3 rounded-xl bg-muted/20">
                  <DetailRow icon={Mail} label="Account Auth Email" value={selectedMember.user?.email} />
                  <DetailRow icon={User} label="First Name Profile" value={selectedMember.user?.firstName} />
                  <DetailRow icon={User} label="Last Name Profile" value={selectedMember.user?.lastName} />
                </div>
              </div>

              {/* Section B: Personal Information */}
              <div>
                <SectionTitle title="Personal Specifications" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 border border-border/60 p-3 rounded-xl bg-muted/20">
                  <DetailRow icon={Mail} label="Form Contact Email" value={selectedMember.email} />
                  <DetailRow icon={Phone} label="Phone Number" value={selectedMember.phone} />
                  <DetailRow icon={Calendar} label="Date of Birth" value={selectedMember.birthDate ? new Date(selectedMember.birthDate).toLocaleDateString() : null} />
                  <DetailRow icon={User} label="Gender" value={`${selectedMember.gender?.toUpperCase()}`} />
                  <DetailRow icon={Award} label="Blood Group" value={selectedMember.bloodGroup} />
                  <DetailRow icon={Award} label="Religion" value={selectedMember.religion} />
                  <DetailRow icon={Briefcase} label="Occupation" value={selectedMember.occupation} />
                  <DetailRow icon={Award} label="Education Structure" value={selectedMember.educationalQualification} />
                  <DetailRow icon={Calendar} label="HSC Passing Year" value={selectedMember.hscPassingYear} />
                  <DetailRow icon={MapPin} label="Home District" value={selectedMember.district} />
                  <div className="sm:col-span-2">
                    <DetailRow icon={MapPin} label="Delivery Address String" value={selectedMember.deliveryAddress} />
                  </div>
                  {selectedMember.facebookLink && (
                    <div className="sm:col-span-2">
                      <div className="flex items-start gap-3 py-2.5 text-sm">
                        <Facebook className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="space-y-0.5 w-full min-w-0">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Facebook Profile</p>
                          <a
                            href={selectedMember.facebookLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline inline-flex items-center gap-1 break-all"
                          >
                            {selectedMember.facebookLink}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section C: Athletic Profile */}
              <div>
                <SectionTitle title="Athletic Profile & Community Engagement" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 border border-border/60 p-3 rounded-xl bg-muted/20">
                  <DetailRow icon={Shirt} label="Selected T-Shirt Size" value={selectedMember.tShirtSize} />
                  <DetailRow icon={Star} label="Preferable Event Type" value={selectedMember.eventType} />
                  <DetailRow icon={Ruler} label="Running Distance Preference" value={selectedMember.preferableRunningDistance} />
                  <DetailRow icon={Hash} label="Events Participated" value={selectedMember.eventsParticipatedNumber} />
                  <DetailRow icon={Award} label="Special Skills" value={selectedMember.specialSkill} />
                  <DetailRow icon={ShieldAlert} label="Is Assigned Event Staff" value={selectedMember.isEventStaff ? "YES (Staff)" : "NO (Standard)"} />
                  <DetailRow icon={User} label="Wants to Join Team" value={selectedMember.wantsToJoinTeam ? "YES" : "NO"} />
                  <DetailRow icon={MapPin} label="Preferred Location" value={selectedMember.preferableEventLocation} />
                  {selectedMember.interested?.length > 0 && (
                    <div className="sm:col-span-2">
                      <DetailRow icon={Heart} label="Areas of Interest" value={Array.isArray(selectedMember.interested) ? selectedMember.interested.join(", ") : selectedMember.interested} />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <DetailRow icon={AlertCircle} label="Reason for Joining Team" value={selectedMember.joinTeamReason} />
                  </div>
                  <div className="sm:col-span-2">
                    <DetailRow icon={AlertCircle} label="Statement of Purpose (Why Join)" value={selectedMember.whyJoin} />
                  </div>
                  {selectedMember.recommendationMessage && (
                    <div className="sm:col-span-2">
                      <DetailRow icon={MessageSquare} label="Ideas / Recommendations" value={selectedMember.recommendationMessage} />
                    </div>
                  )}
                </div>
              </div>

              {/* Section D: Transaction Ledger Summary */}
              <div>
                <SectionTitle title="Payment Ledger Invoices" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 border border-border/60 p-3 rounded-xl bg-muted/20">
                  <DetailRow icon={CreditCard} label="Payment Engine" value={selectedMember.paymentGateway} />
                  <DetailRow icon={CreditCard} label="Transaction Token ID" value={selectedMember.transactionId} />
                  <DetailRow icon={Calendar} label="Payment Timestamp" value={selectedMember.paymentDate ? new Date(selectedMember.paymentDate).toLocaleString() : null} />
                  <DetailRow icon={DollarSign} label="Base Original Value" value={`${selectedMember.orginalAmount} ${selectedMember.currency}`} />
                  <DetailRow icon={DollarSign} label="Deducted Discount" value={`${selectedMember.discountAmount} ${selectedMember.currency}`} />
                  <DetailRow icon={DollarSign} label="Final Settled Amount" value={`${selectedMember.afterDiscountAmount} ${selectedMember.currency}`} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2 stroke-1" />
            <p className="text-sm">No member selection cache active.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}