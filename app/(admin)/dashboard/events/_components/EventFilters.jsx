import { Input } from "@/app/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { CalendarClock, Monitor, Radio, Search, Trophy } from "lucide-react";

export default function EventFilters({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={filterType} onValueChange={setFilterType}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="live"><Radio className="h-3 w-3" /> Live</TabsTrigger>
          <TabsTrigger value="virtual"><Monitor className="h-3 w-3" /> Virtual</TabsTrigger>
          <TabsTrigger value="upcoming"><CalendarClock className="h-3 w-3" /> Upcoming</TabsTrigger>
          <TabsTrigger value="successful"><Trophy className="h-3 w-3" /> Successful</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
