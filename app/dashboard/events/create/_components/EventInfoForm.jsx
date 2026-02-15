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
import { Textarea } from "@/app/components/ui/textarea";
import { createEvent } from "@/services/admin/admin.event.service";
import {
  CalendarClock,
  ClipboardList,
  Monitor,
  Radio,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/* ---------- DATE FORMATTER ---------- */
const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export default function EventInfoForm({ event, onEventCreated }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    organizerName: "",
    description: "",
    date: "",
    time: "",
    address: "",
    eventType: "",
    bannerImage: "",
    thumbImage: "",
  });

  /* ---------- PREFILL FORM (EDIT MODE) ---------- */
  useEffect(() => {
    if (event) {
      setForm({
        name: event?.name || "",
        organizerName: event?.organizerName || "",
        description: event?.description || "",
        date: formatDateForInput(event?.date),
        time: event?.time || "",
        address: event?.address || "",
        eventType: event?.eventType || "",
        bannerImage: event?.eventType || "",
        thumbImage: event?.eventType || "",
      });
    }
  }, [event]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      organizerName: form.organizerName,
      description: form.description,
      date: form.date,
      time: form.time,
      address: form.address,
      eventType: form.eventType,
      bannerImage: null,
      thumbImage: null,
      status: "active",
    };

    try {
      setLoading(true);
      const response = await createEvent(payload);

      console.log(response?.data?.data?.id);
      toast.success("Event created successfully");

      if (onEventCreated && response?.data?.data?.id) {
        onEventCreated(response?.data?.data?.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
          Event Information
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="grid gap-2">
            <Label>Event Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Time *</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Venue & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Venue / Address *</Label>
              <Input
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Event location"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Event Type *</Label>
              <Select
                value={form.eventType}
                onValueChange={(val) => handleChange("eventType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-red-500" />
                      Live
                    </div>
                  </SelectItem>
                  <SelectItem value="virtual">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-blue-500" />
                      Virtual
                    </div>
                  </SelectItem>
                  <SelectItem value="upcoming">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-yellow-500" />
                      Upcoming
                    </div>
                  </SelectItem>
                  <SelectItem value="successful">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                      Successful
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Organizer */}
          <div className="grid gap-2">
            <Label>Organizer Name *</Label>
            <Input
              value={form.organizerName}
              onChange={(e) => handleChange("organizerName", e.target.value)}
              placeholder="e.g., Dhaka Marathon"
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Write event details..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button disabled={loading} className="px-8">
              {loading ? "Saving..." : "Save Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
