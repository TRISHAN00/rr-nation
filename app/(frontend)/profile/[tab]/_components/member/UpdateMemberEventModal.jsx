"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { updateMemberEventById } from "@/services/member.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateMemberEventModal({
  open,
  setOpen,
  event, // The object representing the selected event row
  onRefresh,
}) {
  const [form, setForm] = useState({
    eventName: "",
    eventDate: "",
    runningCategory: "",
    stravaLink: "",
    isCompleted: true,
    organizerName: "",
    registrationFee: "",
    eventVenue: "",
    eventType: "live",
    eventLink: "",
  });

  const [loading, setLoading] = useState(false);

  // Prefill form states when an event object is selected
  useEffect(() => {
    if (event) {
      setForm({
        eventName: event.eventName || "",
        eventDate: event.eventDate ? event.eventDate.split("T")[0] : "",
        runningCategory: event.runningCategory || "",
        stravaLink: event.stravaLink || "",
        isCompleted: event.isCompleted ?? true,
        organizerName: event.organizerName || "",
        registrationFee: event.registrationFee || "",
        eventVenue: event.eventVenue || "",
        eventType: event.eventType || "live",
        eventLink: event.eventLink || "",
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!event?.id) {
      toast.error("Invalid Event ID record resource reference.");
      return;
    }

    try {
      setLoading(true);

      // 1. Build the dynamic partial payload by comparing form values to the original event props
      const payload = {};

      if (form.eventName.trim() !== (event.eventName || "")) {
        payload.eventName = form.eventName.trim();
      }
      
      const originalDate = event.eventDate ? event.eventDate.split("T")[0] : "";
      if (form.eventDate !== originalDate) {
        payload.eventDate = form.eventDate || null;
      }
      
      if (form.runningCategory.trim() !== (event.runningCategory || "")) {
        payload.runningCategory = form.runningCategory.trim();
      }
      
      if (form.stravaLink.trim() !== (event.stravaLink || "")) {
        payload.stravaLink = form.stravaLink.trim() || null;
      }
      
      if (form.isCompleted !== event.isCompleted) {
        payload.isCompleted = form.isCompleted;
      }
      
      if (form.organizerName.trim() !== (event.organizerName || "")) {
        payload.organizerName = form.organizerName.trim();
      }
      
      if (Number(form.registrationFee) !== Number(event.registrationFee || 0)) {
        payload.registrationFee = Number(form.registrationFee) || 0;
      }
      
      if (form.eventVenue.trim() !== (event.eventVenue || "")) {
        payload.eventVenue = form.eventVenue.trim();
      }
      
      if (form.eventType !== (event.eventType || "live")) {
        payload.eventType = form.eventType;
      }
      
      if (form.eventLink.trim() !== (event.eventLink || "")) {
        payload.eventLink = form.eventLink.trim() || null;
      }

      // 2. Prevent api call if no fields were actually changed
      if (Object.keys(payload).length === 0) {
        toast.info("No modifications detected.");
        setOpen(false);
        return;
      }

      // 3. Send only modified fields
      await updateMemberEventById(event.id, payload);
      
      toast.success("Event details updated successfully! 🏃‍♂️");
      onRefresh();
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.response?.data?.message || "Failed to update member event records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Member Running Event</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {/* Event Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Event Name</Label>
            <Input
              placeholder="e.g. Dhaka Marathon 2025"
              value={form.eventName}
              onChange={(e) => handleChange("eventName", e.target.value)}
            />
          </div>

          {/* Event Date */}
          <div className="space-y-1.5">
            <Label>Event Date</Label>
            <Input
              type="date"
              value={form.eventDate}
              onChange={(e) => handleChange("eventDate", e.target.value)}
            />
          </div>

          {/* Running Category */}
          <div className="space-y-1.5">
            <Label>Running Category</Label>
            <Input
              placeholder="e.g. 10K, 21K, 42K"
              value={form.runningCategory}
              onChange={(e) => handleChange("runningCategory", e.target.value.toUpperCase())}
            />
          </div>

          {/* Organizer Name */}
          <div className="space-y-1.5">
            <Label>Organizer Name</Label>
            <Input
              placeholder="e.g. Dhaka Runners Club"
              value={form.organizerName}
              onChange={(e) => handleChange("organizerName", e.target.value)}
            />
          </div>

          {/* Registration Fee */}
          <div className="space-y-1.5">
            <Label>Registration Fee (BDT)</Label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={form.registrationFee}
              onChange={(e) => handleChange("registrationFee", e.target.value)}
            />
          </div>

          {/* Event Venue */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Event Venue</Label>
            <Input
              placeholder="e.g. Hatirjheel, Dhaka"
              value={form.eventVenue}
              onChange={(e) => handleChange("eventVenue", e.target.value)}
            />
          </div>

          {/* Event Type Select */}
          <div className="space-y-1.5">
            <Label>Event Type</Label>
            <Select
              value={form.eventType}
              onValueChange={(val) => handleChange("eventType", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Live Event</SelectItem>
                <SelectItem value="virtual">Virtual Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Completion Status Switch Toggle */}
          <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-muted/20">
            <div className="flex flex-col gap-0.5">
              <Label className="text-sm font-medium">Event Completed</Label>
              <span className="text-xs text-muted-foreground">Toggle log state status</span>
            </div>
            <Switch
              checked={form.isCompleted}
              onCheckedChange={(val) => handleChange("isCompleted", val)}
            />
          </div>

          {/* Strava Activity Link */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Strava Activity Link</Label>
            <Input
              placeholder="https://strava.com/activity/..."
              value={form.stravaLink}
              onChange={(e) => handleChange("stravaLink", e.target.value)}
            />
          </div>

          {/* Official Event Link */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Official Event Website Link</Label>
            <Input
              placeholder="https://event.com"
              value={form.eventLink}
              onChange={(e) => handleChange("eventLink", e.target.value)}
            />
          </div>

          {/* Action Trigger Buttons */}
          <div className="sm:col-span-2 pt-2">
            <Button
              className="w-full"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Update Event Entry"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}