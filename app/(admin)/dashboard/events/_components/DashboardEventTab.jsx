"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const filterConfig = [
  {
    key: "eventStage",
    label: "Stage",
    options: [
      { value: "all", label: "All stages" },
      { value: "ongoing", label: "Ongoing" },
      { value: "upcoming", label: "Upcoming" },
      { value: "completed", label: "Completed" },
    ],
  },
  {
    key: "eventType",
    label: "Type",
    options: [
      { value: "all", label: "All types" },
      { value: "live", label: "Live" },
      { value: "virtual", label: "Virtual" },
    ],
  },
  {
    key: "adminApproval",
    label: "Approval",
    options: [
      { value: "all", label: "All approvals" },
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
  },
  {
    key: "isRunRiseNation",
    label: "Source",
    options: [
      { value: "all", label: "All sources" },
      { value: "true", label: "RunRise" },
      { value: "false", label: "External" },
    ],
  },
];

export default function DashboardEventTab({
  eventStage,
  setEventStage,
  eventType,
  setEventType,
  adminApproval,
  setAdminApproval,
  isRunRiseNation,
  setIsRunRiseNation,
}) {
  const values = { eventStage, eventType, adminApproval, isRunRiseNation };
  const setters = { setEventStage, setEventType, setAdminApproval, setIsRunRiseNation };

  return (
    <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {filterConfig.map(({ key, label, options }) => {
        const setter = setters[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
        return (
          <div key={key} className="space-y-1.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
            <Select value={String(values[key] || "all")} onValueChange={setter}>
              <SelectTrigger className="h-10 w-full bg-background">
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
}