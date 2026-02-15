"use client";
import { Card, CardContent } from "@/app/components/ui/card";
import { Collapsible } from "@/app/components/ui/collapsible";
import {
  getEventById,
  updateEvent,
} from "@/services/admin/admin.event.service";
import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";
import { useState } from "react";
import DashboardPackageContent from "../_components/DashboardPackageContent";
import DashboardEventCardHeader from "./DashboardEventCardHeader";
import EventMeta from "./EventMeta";

const eventTypes = {
  live: {
    label: "Live",
    icon: Radio,
  },
  virtual: {
    label: "Virtual",
    icon: Monitor,
  },
  upcoming: {
    label: "Upcoming",
    icon: CalendarClock,
  },
  successful: {
    label: "Successful",
    icon: Trophy,
  },
};

export default function DashboardEventList({ events, fetchEvent }) {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await getEventById(id);
      const payload = response?.data?.data;

      if (!payload) return;

      const updatedPayload = {
        ...payload,
        isArchived: true,
      };

      console.log(updatedPayload)

      await updateEvent(id, updatedPayload);

      // refresh list after update
      fetchEvent();
    } catch (error) {
      console.error("Archive failed:", error.response || error);
    }
  };

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
                onDelete={handleDelete}
                event={event}
              />

              <CardContent className="pt-0">
                <EventMeta event={event} />

                {/* Packages Section */}
                <DashboardPackageContent event={event} />
              </CardContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
