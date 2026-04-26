"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useDashboardEvents } from "@/app/dashboard/context/EventContext";
import { ClipboardList, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the Editor to avoid SSR issues
const Editor = dynamic(() => import("@/app/dashboard/_components/Editor"), {
  ssr: false,
  loading: () => <div className="h-[200px] w-full animate-pulse bg-muted rounded-md" />
});

const formatDateForInput = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

export default function EventInfoForm({ eventId, onEventCreated, event }) {
  const { handleCreateEvent, handleUpdateEvent, loading } = useDashboardEvents();
  const isEditMode = !!eventId || !!event?.id;

  const [form, setForm] = useState({
    name: "",
    organizerName: "",
    description: "",
    date: "",
    time: "",
    address: "",
    eventType: "",
    minPackagePrice: 0,
    status: "active",
  });

  console.log(form)

  const [bannerImage, setBannerImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);

  useEffect(() => {
    if (event) {
      setForm({
        name: event.name || "",
        organizerName: event.organizerName || "",
        description: event.description || "",
        date: formatDateForInput(event.date),
        time: event.time || "",
        address: event.address || "",
        eventType: event?.eventType || "",
        minPackagePrice: event?.minPackagePrice || "",
        status: event?.status || "active",
      });
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (isEditMode) {
      formData.append("eventId", eventId || event?.id);

      Object.keys(form).forEach((key) => {
        let initialValue = event[key] ?? "";
        if (key === 'date') initialValue = formatDateForInput(event.date);
        if (key === 'minPackagePrice') initialValue = String(event.minPackagePrice ?? "");

        if (String(form[key]) !== String(initialValue)) {
          formData.append(key, form[key]);
        }
      });

      if (bannerImage) formData.append("bannerImage", bannerImage);
      if (thumbImage) formData.append("thumbImage", thumbImage);

      await handleUpdateEvent(formData, eventId || event?.id);
    } else {
      // --- CREATE MODE FIX ---
      Object.keys(form).forEach((key) => {
        // Description jodi empty thake tobe backend error dey, tai empty string ensure korchi
        if (key === "description") {
          formData.append(key, form[key] || "");
        } else if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      if (bannerImage) formData.append("bannerImage", bannerImage);
      if (thumbImage) formData.append("thumbImage", thumbImage);

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
                onChange={(e) => setForm({ ...form, organizerName: e.target.value })}
              />
            </div>
          </div>

          {/* Row 2: Rich Text Editor Description */}
          <div className="grid gap-2">
            <Label>Event Description *</Label>
            <Editor
              initialContent={event?.description}
              editable={!loading}
              onChange={(html) => setForm({ ...form, description: html })}
            />
          </div>

          {/* Row 3: Date, Time, Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                required
                disabled={loading}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                placeholder="08:00 AM"
                disabled={loading}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Min Price *</Label>
              <Input
                id="price"
                type="number"
                disabled={loading}
                value={form.minPackagePrice}
                onChange={(e) => setForm({ ...form, minPackagePrice: e.target.value })}
              />
            </div>
          </div>

          {/* Row 4: Venue, Type, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="grid gap-2">
              <Label>Status *</Label>
              <Select
                disabled={loading}
                value={form.status}
                onValueChange={(val) => setForm({ ...form, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 5: Images */}
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
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
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Working...</>
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