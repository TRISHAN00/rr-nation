import { Calendar } from "lucide-react";
import EventCard from "./DashboardEventCard";

export default function EventList({ events }) {
  if (!events.length) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
