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
import { useState } from "react";
import { toast } from "sonner";

export default function EventInfoForm({event}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(event || {
    name: "",
    organizerName: "",
    description: "",
    date: "",
    time: "",
    address: "",
    eventType: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      organizerName: form.organizerName,
      description: form.description,
      images: [],
      date: form.date,
      time: form.time,
      address: form.address,
      eventType: form.eventType,
      status: "active",
    };

    try {
      setLoading(true);
      // await createEvent(payload);
      await createEvent(payload);
      toast.success("Event created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Please try again!!");
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
              placeholder="Enter event name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
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
                placeholder="Event location"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
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
              placeholder="e.g., Dhaka Marathon"
              value={form.organizerName}
              onChange={(e) => handleChange("organizerName", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              placeholder="Write event details..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
