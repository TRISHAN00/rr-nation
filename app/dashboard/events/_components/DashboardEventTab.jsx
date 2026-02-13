import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { CalendarClock, Monitor, Radio, Trophy } from "lucide-react";

export default function DashboardEventTab() {
  return (
    <Tabs className="w-auto">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="live" className="gap-1">
          <Radio className="h-3 w-3" />
          Live
        </TabsTrigger>
        <TabsTrigger value="virtual" className="gap-1">
          <Monitor className="h-3 w-3" />
          Virtual
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="gap-1">
          <CalendarClock className="h-3 w-3" />
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="successful" className="gap-1">
          <Trophy className="h-3 w-3" />
          Successful
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
