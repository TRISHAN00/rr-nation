"use client";

import FillButton from "@/app/components/common/FillButton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { createMemberEvent } from "@/services/member.service";
import { useState } from "react";
import { toast } from "sonner";

export default function AddMemberEventModal({ onEventAdded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    runningCategory: "",
    stravaLink: "",
    isCompleted: false,
    organizerName: "",
    registrationFee: 0,
    eventVenue: "",
    eventType: "live",
    eventLink: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createMemberEvent(formData);

      // Handle custom standard response structures
      if (response?.statusCode === 200 || response?.id || response?.success) {
        toast.success("Event added successfully! 🏃‍♂️");
        setOpen(false);
        
        // Reset form data state
        setFormData({
          eventName: "",
          eventDate: "",
          runningCategory: "",
          stravaLink: "",
          isCompleted: false,
          organizerName: "",
          registrationFee: 0,
          eventVenue: "",
          eventType: "live",
          eventLink: ""
        });

        if (onEventAdded) onEventAdded(); // Triggers a list refetch in parent view
      } else {
        toast.error(response?.message || "Failed to add event");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FillButton>+ Add New Event</FillButton>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Log New Running Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          
          {/* Event Name */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Event Name</Label>
            <Input
              required
              name="eventName"
              value={formData.eventName}
              placeholder="e.g. Dhaka Marathon 2026"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-1.5">
            <Label>Event Date</Label>
            <Input
              required
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Running Category */}
          <div className="flex flex-col gap-1.5">
            <Label>Running Category</Label>
            <Input
              required
              name="runningCategory"
              value={formData.runningCategory}
              placeholder="e.g. 10K, 21K, 42K"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Organizer Name */}
          <div className="flex flex-col gap-1.5">
            <Label>Organizer Name</Label>
            <Input
              name="organizerName"
              value={formData.organizerName}
              placeholder="e.g. Dhaka Runners Club"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Registration Fee */}
          <div className="flex flex-col gap-1.5">
            <Label>Registration Fee (BDT)</Label>
            <Input
              type="number"
              name="registrationFee"
              value={formData.registrationFee || ""}
              placeholder="500"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Event Venue */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Event Venue</Label>
            <Input
              name="eventVenue"
              value={formData.eventVenue}
              placeholder="e.g. Hatirjheel, Dhaka"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Event Type Dropdown */}
          <div className="flex flex-col gap-1.5">
            <Label>Event Type</Label>
            <Select 
              value={formData.eventType} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, eventType: val }))}
            >
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Live Event</SelectItem>
                <SelectItem value="virtual">Virtual Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Is Completed Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <Label>Completion Status</Label>
            <Select 
              value={formData.isCompleted ? "true" : "false"} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, isCompleted: val === "true" }))}
            >
              <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-800">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Upcoming / Ongoing</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Strava Link */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Strava Activity Link</Label>
            <Input
              name="stravaLink"
              value={formData.stravaLink}
              placeholder="https://strava.com/activity/..."
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Event Official Website Link */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>Official Event Link</Label>
            <Input
              name="eventLink"
              value={formData.eventLink}
              placeholder="https://event.com"
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Action Buttons */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <FillButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Event Entry"}
            </FillButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}