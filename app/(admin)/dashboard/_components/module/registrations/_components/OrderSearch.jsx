"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getAllEvents } from "@/services/admin/admin.event.service";
import { Calendar, ListFilter, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderSearch({
  searchQuery,
  setSearchQuery,
  filterEvent,
  setShowRegItem,
  showRegItem,
  setSelectedEventId, // This is the prop we use to pass the selected ID back up
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        // Fallback check to handle API structures (e.g., res.data or just res)
        const eventData = res?.data || res || [];
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle value change safely
  const handleEventChange = (value) => {
    setSelectedEventId(value);
    
    if (value === "all") {
      setSelectedEventId(null); // or "" depending on what your API expects for "no filter"
    } else {
      setSelectedEventId(value); // Passes the unique event.id up to the parent component
    }
  };

  return (
    <div className="flex sticky top-20 flex-col gap-4 p-4 rounded-xl border bg-card z-10 shadow-sm lg:flex-row lg:items-center">
      
      {/* 1. Search Section - Grows to fill space */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
        <Input
          placeholder="Search registrations..."
          className="pl-10 h-11 bg-background border-muted-foreground/20 focus-visible:ring-primary/30 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 2. Divider for Desktop */}
      <div className="hidden lg:block h-8 w-[1px] bg-border mx-2" />

      {/* 3. Filters & Controls Group */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Event Filter */}
        <div className="flex-1 sm:flex-initial min-w-[200px]">
          <Select value={filterEvent} onValueChange={handleEventChange}>
            <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Event" />
              </div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                // Stringifying the event.id ensures shadcn select components process values correctly
                <SelectItem key={event.id} value={String(event.id)}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rows Per Page Control */}
        <div className="flex items-center gap-2 bg-background border border-muted-foreground/20 rounded-md px-3 h-11 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <ListFilter className="h-4 w-4 text-muted-foreground/70" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:inline">
            Rows:
          </span>
          <input
            type="number"
            placeholder="50"
            className="w-12 bg-transparent border-none focus:outline-none text-sm font-medium"
            value={showRegItem || ""}
            onChange={(e) => {
              const val = e.target.value;
              setShowRegItem(val === "" ? 0 : Number(val));
            }}
          />
        </div>

        {/* Reset / More Button */}
        <button 
          onClick={() => {
            setSearchQuery("");
            setFilterEvent("all");
            setSelectedEventId(null);
            setShowRegItem(50);
          }}
          className="p-2.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          title="Reset Filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}