"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Collapsible } from "@/app/components/ui/collapsible";
import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";
import { useCallback, useState } from "react";

import { toast } from "sonner";
import { deleteDashboardOrganizerEvent } from "../../services/organizer.event.service";
import OrgDashEvCardHeader from "./OrgDashEvCardHeader";
import OrgDashTickContent from "./OrgDashTickContent";
import OrgEventMeta from "./OrgEventMeta";

const eventTypes = {
    live: { label: "Live", icon: Radio },
    virtual: { label: "Virtual", icon: Monitor },
    upcoming: { label: "Upcoming", icon: CalendarClock },
    successful: { label: "Successful", icon: Trophy },
};

export default function OrgDashEventList({ events, loading, onRefresh, setLoading }) {
    const [expandedEvent, setExpandedEvent] = useState(null);

    // --- DELETE EVENT ---
    const handleDeleteDashboardEvent = useCallback(
        async (eventId) => {
            try {
                setLoading(true);
                await deleteDashboardOrganizerEvent(eventId);
                toast.success("Event deleted successfully");
                await onRefresh();
            } catch (err) {
                toast.error("Failed to delete event");
            } finally {
                setLoading(false);
            }
        },
        [onRefresh],
    );

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

                            <OrgDashEvCardHeader
                                TypeIcon={TypeIcon}
                                typeConfig={typeConfig}
                                expandedEvent={expandedEvent}
                                onDelete={() => handleDeleteDashboardEvent(event.id)}
                                event={event}
                                loading={loading}
                            />

                            <CardContent className="pt-0">
                                <OrgEventMeta event={event} />
                                <OrgDashTickContent event={event} />
                            </CardContent>
                        </Card>
                    </Collapsible>
                );
            })}
        </div>
    );
}
