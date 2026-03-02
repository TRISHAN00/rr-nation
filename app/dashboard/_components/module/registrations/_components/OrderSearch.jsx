"use client";

import { Input } from "@/app/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Calendar, Search } from "lucide-react";

export default function OrderSearch({ 
  searchQuery, 
  setSearchQuery, 
  filterEvent, 
  setFilterEvent 
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          className="pl-10 border-border bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Event Filter */}
      <Select value={filterEvent} onValueChange={setFilterEvent}>
        <SelectTrigger className="w-[200px] border-border bg-background">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <SelectValue placeholder="Filter by event" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="RunRise Nation">RunRise Nation</SelectItem>
          <SelectItem value="City Marathon">City Marathon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}