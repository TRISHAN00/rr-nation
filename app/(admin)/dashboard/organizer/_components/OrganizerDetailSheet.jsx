"use client";

import Image from "next/image";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDate } from "@/lib/dateFormat";
import { Building2, ExternalLink, FileText, Mail, MapPin, Phone, User } from "lucide-react";
import SwitchStatusBadge from "./SwitchStatusBadge";

function SectionTitle({ children }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </h4>
  );
}

function InfoItem({ label, value, className = "" }) {
  const display = value === null || value === undefined || value === "" ? "—" : value;
  return (
    <div className={className}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm break-words whitespace-pre-wrap">{display}</p>
    </div>
  );
}

function LinkItem({ label, href, icon: Icon = ExternalLink }) {
  if (!href) {
    return <InfoItem label={label} value="—" />;
  }
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline break-all"
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        Open
      </a>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

const boolText = (value) => (value === true ? "Yes" : value === false ? "No" : "—");

export default function OrganizerDetailSheet({ isOpen, onOpenChange, organizer }) {
  const user = organizer?.user || {};
  const fullUserName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "—";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full bg-card border-l border-border p-0 flex flex-col h-full shadow-2xl">
        <div className="border-b border-border px-6 py-5">
          <SheetHeader>
            <SheetTitle className="text-xl font-extrabold tracking-tight">
              Organizer Details
            </SheetTitle>
            <SheetDescription className="break-all">
              {organizer?.organizationName || "Organizer information"}
            </SheetDescription>
          </SheetHeader>
        </div>

        {!organizer ? (
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            No organizer selected.
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`uppercase ${SwitchStatusBadge(organizer.adminApproval)}`}>
                {organizer.adminApproval || "pending"}
              </Badge>
              <Badge variant={organizer.isActive ? "default" : "secondary"}>
                {organizer.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant={organizer.isArchived ? "destructive" : "outline"}>
                {organizer.isArchived ? "Archived" : "Not Archived"}
              </Badge>
            </div>

            <section className="space-y-3">
              <SectionTitle>Organization</SectionTitle>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4">
                {organizer.organizationLogo ? (
                  <Image
                    src={organizer.organizationLogo}
                    alt={organizer.organizationName || "Organization logo"}
                    width={72}
                    height={72}
                    className="h-18 w-18 rounded-md border border-border object-cover"
                  />
                ) : (
                  <div className="h-18 w-18 rounded-md border border-border bg-muted flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <InfoItem label="Organization ID" value={organizer.id ? `#${String(organizer.id).padStart(4, "0")}` : "—"} />
                  <InfoItem label="Organization Name" value={organizer.organizationName} />
                  <InfoItem label="Organization Type" value={organizer.organizationType} />
                  <InfoItem label="Primary Representative" value={organizer.primaryRepresentative} />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Contact & Address</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Official Contact">
                  <InfoItem label="Official Email" value={organizer.officialEmail} />
                  <InfoItem label="Official Phone" value={organizer.officialPhone} />
                  <LinkItem label="Social Media Link" href={organizer.socialMediaLink} icon={ExternalLink} />
                </InfoCard>
                <InfoCard title="Office">
                  <InfoItem label="Office Address" value={organizer.officeAddress} />
                  <InfoItem label="Preferred Event Zone" value={organizer.preferredEventZone} />
                </InfoCard>
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Registration & Compliance</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Registration Number" value={organizer.registrationNumber} />
                <InfoItem label="TIN Number" value={organizer.tinNumber} />
                <InfoItem label="Total Events Organized" value={organizer.totalEventsOrganized} />
                <InfoItem label="Average Participant Size" value={organizer.averageParticipantSize} />
                <InfoItem label="Why Join Us" value={organizer.whyJoinUs} className="sm:col-span-2" />
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Bank & Payout</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Bank Name" value={organizer.bankName} />
                <InfoItem label="Bank Branch" value={organizer.bankBranch} />
                <InfoItem label="Bank Account Name" value={organizer.bankAccountName} />
                <InfoItem label="Bank Account Number" value={organizer.bankAccountNumber} />
                <InfoItem label="Preferred Payout Cycle" value={organizer.preferredPayoutCycle} />
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>Documents</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <LinkItem label="Organization Logo" href={organizer.organizationLogo} icon={ExternalLink} />
                <LinkItem label="NID / Passport Copy" href={organizer.nidOrPassportCopy} icon={FileText} />
                <LinkItem label="Company Profile PDF" href={organizer.companyProfilePdf} icon={FileText} />
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <SectionTitle>User Account</SectionTitle>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={fullUserName}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full border border-border bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <InfoItem label="User ID" value={user.id} />
                  <InfoItem label="Name" value={fullUserName} />
                  <InfoItem label="Email" value={user.email} />
                  <InfoItem label="Phone" value={user.phone} />
                  <InfoItem label="Username" value={user.userName} />
                  <InfoItem label="Gender" value={user.gender} />
                  <InfoItem label="Birth Date" value={user.birthDate ? formatDate(user.birthDate) : "—"} />
                  <InfoItem label="Address" value={user.address} className="sm:col-span-2" />
                  <InfoItem label="Force Password Change" value={boolText(user.forcePasswordChange)} />
                  <InfoItem label="User Active" value={boolText(user.isActive)} />
                  <InfoItem label="User Archived" value={boolText(user.isArchived)} />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <SectionTitle>System</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Created At" value={organizer.createdAt ? formatDate(organizer.createdAt) : "—"} />
                <InfoItem label="Updated At" value={organizer.updatedAt ? formatDate(organizer.updatedAt) : "—"} />
                <InfoItem label="Admin Approval" value={organizer.adminApproval} />
                <InfoItem label="Is Active" value={boolText(organizer.isActive)} />
                <InfoItem label="Is Archived" value={boolText(organizer.isArchived)} />
              </div>
            </section>

            <div className="flex flex-wrap gap-2">
              {organizer.officialEmail && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${organizer.officialEmail}`}>
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </a>
                </Button>
              )}
              {organizer.officialPhone && (
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${organizer.officialPhone}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call
                  </a>
                </Button>
              )}
              {organizer.officeAddress && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(organizer.officeAddress)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Map
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
