"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea"; // Added Textarea for description
import { useDashboardEvents } from "@/app/dashboard/context/EventContext";
import { ClipboardList, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const formatDateForInput = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

export default function EventInfoForm({ eventId, onEventCreated, event }) {
  const { handleCreateEvent, handleUpdateEvent, loading } =
    useDashboardEvents();

  // Changed: Check for event existence OR eventId to determine edit mode
  const isEditMode = !!eventId || !!event?.id;

  const [form, setForm] = useState({
    name: "",
    organizerName: "",
    description: "",
    date: "",
    time: "",
    address: "",
    eventType: "",
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);

  // Sync internal form state when the 'event' prop changes
  useEffect(() => {
    if (event) {
      setForm({
        name: event.name || "",
        organizerName: event.organizerName || "",
        description: event.description || "",
        date: formatDateForInput(event.date),
        time: event.time || "",
        address: event.address || "",
        eventType: event.eventType || "",
      });
    }
  }, [event]); // Triggers whenever the event data is fetched and passed in

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      // Important: Check for value existence before appending
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    formData.append("status", "active");

    if (bannerImage) formData.append("bannerImage", bannerImage);
    if (thumbImage) formData.append("thumbImage", thumbImage);

    if (isEditMode) {
      // Use eventId from params or the event object
      const targetId = eventId || event?.id;
      await handleUpdateEvent(targetId, formData);
    } else {
      const newId = await handleCreateEvent(formData);
      if (onEventCreated && newId) onEventCreated(newId);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
          {isEditMode ? "Edit Event Information" : "Create New Event"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1: Name and Organizer */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                disabled={loading}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organizer">Organizer Name</Label>
              <Input
                id="organizer"
                disabled={loading}
                value={form.organizerName}
                onChange={(e) =>
                  setForm({ ...form, organizerName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Row 2: Description (Full Width) */}
          <div className="grid gap-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us more about the event..."
              className="min-h-[120px] resize-none"
              disabled={loading}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Row 3: Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                disabled={loading}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                disabled={loading}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Row 4: Venue and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                disabled={loading}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Event Type *</Label>
              <Select
                disabled={loading}
                value={form.eventType}
                onValueChange={(val) => setForm({ ...form, eventType: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 5: Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Banner Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label>Thumbnail Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbImage(e.target.files[0])}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={loading} className="min-w-[150px]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
