import { Calendar, Clock, MapPin, User, Users } from "lucide-react";

export default function EventMeta({ event }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm mt-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        {event.date}
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

      <div className="flex items-center gap-2 ml-auto">
        <Users className="h-4 w-4 text-primary" />
        <span className="font-semibold">{event.totalRegistrations}</span>
        <span className="text-muted-foreground">registrations</span>
      </div>
    </div>
  );
}
