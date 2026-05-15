"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Collapsible } from "@/app/components/ui/collapsible";
import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";
import { useState } from "react";

import { useDashboardEvents } from "../../context/EventContext";
import DashboardEventCardHeader from "./DashboardEventCardHeader";
import DashboardTicketContent from "./DashboardTicketContent";
import EventMeta from "./EventMeta";

const eventTypes = {
  live: { label: "Live", icon: Radio },
  virtual: { label: "Virtual", icon: Monitor },
  upcoming: { label: "Upcoming", icon: CalendarClock },
  successful: { label: "Successful", icon: Trophy },
};

export default function DashboardEventList({ events }) {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const { handleDeleteDashboardEvent, loading } = useDashboardEvents();

  return (
    <div className="space-y-4">
      {events?.map((event) => {
        const typeConfig = eventTypes[event.eventType];
        const TypeIcon = typeConfig.icon;

        return (
          <Collapsible
            key={event.id}
            open={expandedEvent === event.id}
            onOpenChange={() =>
              setExpandedEvent(expandedEvent === event.id ? null : event.id)
            }
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="h-1.5 bg-linear-to-r from-primary to-primary/70" />

              <DashboardEventCardHeader
                TypeIcon={TypeIcon}
                typeConfig={typeConfig}
                expandedEvent={expandedEvent}
                onDelete={() => handleDeleteDashboardEvent(event.id)}
                event={event}
                loading={loading}
              />

              <CardContent className="pt-0">
                <EventMeta event={event} />
                <DashboardTicketContent event={event} />
              </CardContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
