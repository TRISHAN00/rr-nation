"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { addMemberEvent } from "@/services/member.service"; // Adjust file location path accordingly
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateMemberEventModal({ open, setOpen, onRefresh }) {
  // Initialize dynamic structure state reflecting your unique layout payload strings
  const [events, setEvents] = useState([
    {
      eventName: "",
      eventDate: "",
      runningCategory: "",
      stravaLink: "",
      isCompleted: "true", // Using string for easy select handling, parsed to bool on submission
      organizerName: "",
      registrationFee: "",
      eventVenue: "",
      eventType: "live",
      eventLink: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Handle value change dynamically per dynamic row array index selection
  const handleChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  // Append new item configuration blocks down into state arrays
  const addEventRow = () => {
    setEvents([
      ...events,
      {
        eventName: "",
        eventDate: "",
        runningCategory: "",
        stravaLink: "",
        isCompleted: "true",
        organizerName: "",
        registrationFee: "",
        eventVenue: "",
        eventType: "live",
        eventLink: "",
      },
    ]);
  };

  // Splice target index to clean items out of view grid layouts
  const removeEventRow = (index) => {
    const updated = events.filter((_, i) => i !== index);
    setEvents(updated);
  };

  // Purge component memory data back down safely on dialog dismiss transitions
  const resetForm = () => {
    setEvents([
      {
        eventName: "",
        eventDate: "",
        runningCategory: "",
        stravaLink: "",
        isCompleted: "true",
        organizerName: "",
        registrationFee: "",
        eventVenue: "",
        eventType: "live",
        eventLink: "",
      },
    ]);
  };

  // Submit parsed dynamic batch array nodes
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Map array content configurations over matching exact entity schemas type structures
      // If your API accepts an array, send this payload directly. If it only accepts single items, 
      // you can loop this map array or modify the payload mapping structure as needed.
      const payload = events.map((ev) => ({
        eventName: ev.eventName.trim(),
        eventDate: ev.eventDate,
        runningCategory: ev.runningCategory.trim(),
        stravaLink: ev.stravaLink.trim() || null,
        isCompleted: ev.isCompleted === "true",
        organizerName: ev.organizerName.trim(),
        registrationFee: Number(ev.registrationFee) || 0,
        eventVenue: ev.eventVenue.trim(),
        eventType: ev.eventType,
        eventLink: ev.eventLink.trim() || null,
      }));


      await Promise.all(payload.map(singleEvent => addMemberEvent(singleEvent)));

      toast.success("Member events successfully synchronized! 🏃‍♂️");
      resetForm();
      setOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Failed to process event registration creation:", error);
      toast.error(error?.response?.data?.message || "Event creation workflow execution failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="max-w-5xl w-[95vw]">
        <DialogHeader>
          <DialogTitle>Log Member Running Events</DialogTitle>
        </DialogHeader>

        {/* Dynamic List Input Row Container Grid blocks */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {events.map((event, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border p-4 rounded-xl bg-muted/30 relative pt-10 md:pt-4"
            >
              {/* Row Count Badge Tracker & Trash positioning tool */}
              <div className="absolute top-2 left-3 text-xs font-bold text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                Row #{index + 1}
              </div>

              {/* Event Name */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <Input
                  required
                  placeholder="Event Name (e.g. Dhaka Marathon)"
                  value={event.eventName}
                  onChange={(e) => handleChange(index, "eventName", e.target.value)}
                />
              </div>

              {/* Event Date */}
              <div className="flex flex-col gap-1">
                <Input
                  required
                  type="date"
                  value={event.eventDate}
                  onChange={(e) => handleChange(index, "eventDate", e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <Input
                  required
                  placeholder="Category (e.g. 10K, 21K)"
                  value={event.runningCategory}
                  onChange={(e) => handleChange(index, "runningCategory", e.target.value.toUpperCase())}
                />
              </div>

              {/* Organizer Name */}
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Organizer (e.g. Dhaka Runners)"
                  value={event.organizerName}
                  onChange={(e) => handleChange(index, "organizerName", e.target.value)}
                />
              </div>

              {/* Registration Fee */}
              <div className="flex flex-col gap-1">
                <Input
                  type="number"
                  placeholder="Registration Fee (BDT)"
                  value={event.registrationFee}
                  onChange={(e) => handleChange(index, "registrationFee", e.target.value)}
                />
              </div>

              {/* Event Type Select dropdown */}
              <div className="flex flex-col gap-1">
                <Select
                  value={event.eventType}
                  onValueChange={(val) => handleChange(index, "eventType", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Run Status Verification dropdown */}
              <div className="flex flex-col gap-1">
                <Select
                  value={event.isCompleted}
                  onValueChange={(val) => handleChange(index, "isCompleted", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Run Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Completed</SelectItem>
                    <SelectItem value="false">Upcoming / Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Venue */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <Input
                  placeholder="Venue (e.g. Hatirjheel, Dhaka)"
                  value={event.eventVenue}
                  onChange={(e) => handleChange(index, "eventVenue", e.target.value)}
                />
              </div>

              {/* Strava link string input fields */}
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Strava Activity Link"
                  value={event.stravaLink}
                  onChange={(e) => handleChange(index, "stravaLink", e.target.value)}
                />
              </div>

              {/* Event Link identifier maps */}
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Official Event Link"
                  value={event.eventLink}
                  onChange={(e) => handleChange(index, "eventLink", e.target.value)}
                />
              </div>

              {/* Row Action Trigger Layout columns */}
              <div className="absolute right-2 top-2 md:static md:flex md:items-center md:justify-center pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEventRow(index)}
                  disabled={events.length === 1}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Footer Workflow Controls */}
        <div className="flex justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={addEventRow}>
            <Plus className="h-4 w-4 mr-1" /> Add Another Event
          </Button>

          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : `Register (${events.length}) Events`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}