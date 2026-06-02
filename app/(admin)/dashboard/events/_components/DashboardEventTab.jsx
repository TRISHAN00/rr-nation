"use client";

import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { CalendarClock, MapPin, Monitor, Radio, Trophy } from "lucide-react";

export default function DashboardEventTab({ 
  eventStage, 
  setEventStage, 
  eventType, 
  setEventType 
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* --- Event Stage Filters --- */}
      <Tabs value={eventStage || "all"} onValueChange={setEventStage} className="w-auto">
        <TabsList>
          <TabsTrigger value="all">All Stages</TabsTrigger>
          <TabsTrigger value="ongoing" className="gap-1">
            <Radio className="h-3 w-3" /> Ongoing
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-1">
            <CalendarClock className="h-3 w-3" /> Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-1">
            <Trophy className="h-3 w-3" /> Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* --- Event Type Filters --- */}
      <Tabs value={eventType || "all"} onValueChange={setEventType} className="w-auto">
        <TabsList>
          <TabsTrigger value="all">All Types</TabsTrigger>
          <TabsTrigger value="live" className="gap-1">
            <MapPin className="h-3 w-3" /> Live
          </TabsTrigger>
          <TabsTrigger value="virtual" className="gap-1">
            <Monitor className="h-3 w-3" /> Virtual
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}