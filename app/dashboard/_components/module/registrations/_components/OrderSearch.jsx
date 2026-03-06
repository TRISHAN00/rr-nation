"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Calendar, Search, User } from "lucide-react";

export default function OrderSearch({
  searchQuery,
  setSearchQuery,
  filterEvent,
  setFilterEvent,
  setShowRegItem,
  showRegItem,
}) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          className="pl-10 h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Event Filter */}
        <Select value={filterEvent} onValueChange={setFilterEvent}>
          <SelectTrigger className="w-full sm:w-[200px] h-10">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="RunRise Nation">RunRise Nation</SelectItem>
            <SelectItem value="City Marathon">City Marathon</SelectItem>
          </SelectContent>
        </Select>

        {/* Registration Filter */}
        <div className="relative w-full sm:w-[200px]">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Registration ID"
            className="pl-10 h-10"
            value={showRegItem}
            onChange={(e) => setShowRegItem(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}