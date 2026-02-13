import { Calendar, Clock, MapPin, User } from "lucide-react";
import DashboardEventCardTotalReg from "./DashboardEventCardTotalReg";

export default function EventMeta({ event }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        {new Date(event.date).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        {event.time}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        {event.venue}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <User className="h-4 w-4" />
        {event.organizer}
      </div>
      <DashboardEventCardTotalReg event={event} />
    </div>
  );
}
