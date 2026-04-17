"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Calendar, ListFilter, Search, SlidersHorizontal } from "lucide-react";

export default function OrderSearch({
  searchQuery,
  setSearchQuery,
  filterEvent,
  setFilterEvent,
  setShowRegItem,
  showRegItem,
}) {
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

      {/* 2. Divider for Desktop (Optional) */}
      <div className="hidden lg:block h-8 w-[1px] bg-border mx-2" />

      {/* 3. Filters & Controls Group */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Event Filter */}
        <div className="flex-1 sm:flex-initial min-w-[160px]">
          <Select value={filterEvent} onValueChange={setFilterEvent}>
            <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Event" />
              </div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="RunRise Nation">RunRise Nation</SelectItem>
              <SelectItem value="City Marathon">City Marathon</SelectItem>
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

        {/* Reset / More Button (Optional Visual Anchor) */}
        <button 
          onClick={() => {
            setSearchQuery("");
            setFilterEvent("all");
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