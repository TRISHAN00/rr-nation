"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Building2, CheckCircle2, Clock3, ShieldX } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  pending: {
    icon: Clock3,
    label: "Pending Review",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    title: "Your organizer application is under review",
    description:
      "Thanks for registering. Our team is reviewing your documents and organization details. You’ll get access to the Organizer Dashboard once an admin approves your application.",
  },
  approved: {
    icon: CheckCircle2,
    label: "Approved",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "Your organizer account is approved",
    description:
      "You can now access your organizer dashboard and start managing events.",
  },
  rejected: {
    icon: ShieldX,
    label: "Rejected",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    title: "Your organizer application needs attention",
    description:
      "Your application was not approved. Please contact support or submit updated information if the registration flow allows resubmission.",
  },
};

export default function OrganizerStatusCard({ registration }) {
  const status = String(registration?.adminApproval || "pending").toLowerCase();
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;

  return (
    <Card className="border-border/70 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 sm:p-8 border-b bg-muted/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-background border flex items-center justify-center shrink-0">
                {registration?.organizationLogo ? (
                  <img
                    src={registration.organizationLogo}
                    alt={registration.organizationName || "Organization"}
                    className="h-10 w-10 object-contain rounded-lg"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-semibold text-dark">{cfg.title}</h2>
                  <Badge className={`uppercase ${cfg.badge}`}>{cfg.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{cfg.description}</p>
              </div>
            </div>
            {status === "approved" && (
              <Button asChild>
                <Link href="/organizer/dashboard">Go to Organizer Dashboard</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <Info label="Organization" value={registration?.organizationName} />
          <Info label="Representative" value={registration?.primaryRepresentative} />
          <Info label="Official Email" value={registration?.officialEmail} />
          <Info label="Phone" value={registration?.officialPhone} />
          <Info label="Registration No." value={registration?.registrationNumber} />
          <Info label="Submitted" value={registration?.createdAt ? new Date(registration.createdAt).toLocaleString() : null} />
        </div>
      </CardContent>
    </Card>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className="font-medium text-dark break-words">{value || "-"}</div>
    </div>
  );
}