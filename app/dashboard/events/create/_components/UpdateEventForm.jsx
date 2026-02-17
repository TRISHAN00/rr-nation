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
import {
  CalendarClock,
  ClipboardList,
  ImageIcon,
  Monitor,
  Radio,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UpdateEventForm({ event }) {
  const [formData, setFormData] = useState({
    name: "",
    organizerName: "",
    description: "",
    date: "",
    time: "",
    address: "",
    eventType: "",
    bannerImage: null,
    thumbImage: null,
  });

  const [loading, setLoading] = useState(false);

  /* Populate form when event loads */
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        organizerName: event.organizerName || "",
        description: event.description || "",
        date: event.date || "",
        time: event.time || "",
        address: event.address || "",
        eventType: event.eventType || "",
        bannerImage: null,
        thumbImage: null,
      });
    }
  }, [event]);

  /* Generic input handler */
  const handleChange = (field, value) => {
    console.log(field, value)
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* Submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) payload.append(key, value);
      });

      console.log(payload)

      // const response = await updateEvent(event?.id, payload);
      // console.log(response);

      // Example API call
      // await api.put(`/events/${event.id}`, payload);

      console.log("Submitted Data:", Object.fromEntries(payload));
    } catch (error) {
      console.error("Update failed:", error);
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
              name="name"
              value={formData.name}
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
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Time *</Label>
              <Input
                type="time"
                value={formData.time}
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
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Event location"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Event Type *</Label>
              <Select
                value={formData.eventType}
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
              value={formData.organizerName}
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
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Write event details..."
            />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Banner Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("bannerImage", e.target.files[0])}
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Thumbnail Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("thumbImage", e.target.files[0])}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button disabled={loading} className="px-8" type="submit">
              {loading ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
