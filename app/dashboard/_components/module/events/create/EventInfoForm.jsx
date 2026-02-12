"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
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
    Monitor,
    Radio,
    Trophy,
} from "lucide-react";

export default function EventInfoForm() {
  return (
    <Card className="w-full  shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
          Event Information
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-6">
          {/* Event Name */}
          <div className="grid gap-2">
            <Label htmlFor="title">Event Name *</Label>
            <Input id="title" placeholder="Enter event name" />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time *</Label>
              <Input id="time" type="time" />
            </div>
          </div>

          {/* Venue & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="venue">Venue / Address *</Label>
              <Input id="venue" placeholder="Event location" />
            </div>

            <div className="grid gap-2">
              <Label>Event Type *</Label>
              <Select>
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
            <Label htmlFor="organizer">Organizer Name *</Label>
            <Input id="organizer" placeholder="e.g., Run Rise Nation" />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write event details..."
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button className="px-8">Save Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
