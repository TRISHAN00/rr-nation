import { Users } from "lucide-react";

export default function DashboardEventCardTotalReg({ event }) {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <Users className="h-4 w-4 text-primary" />
      <span className="font-semibold text-foreground">
        {event.totalRegistrations}
      </span>
      <span className="text-muted-foreground">registrations</span>
    </div>
  );
}
