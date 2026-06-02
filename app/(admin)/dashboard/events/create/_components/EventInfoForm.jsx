"use client";

import { useDashboardEvents } from "@/app/(admin)/dashboard/context/EventContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"; // Ensure you have Radix/Shadcn tabs installed
import { Textarea } from "@/app/components/ui/textarea";
import { ClipboardList, Code, Eye, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("@/app/(admin)/dashboard/_components/Editor"), {
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
    emailTemplate: "", 
    date: "",
    time: "",
    address: "",
    eventType: "",
    eventStage: "",
    minPackagePrice: 0,
    packageType: "",
    status: "active",
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);
  const [activeTab, setActiveTab] = useState("edit"); // State to switch between HTML editor and HTML View

  useEffect(() => {
    if (event) {
      setForm({
        name: event.name || "",
        organizerName: event.organizerName || "",
        description: event.description || "",
        emailTemplate: event.emailTemplate || "",
        date: formatDateForInput(event.date),
        time: event.time || "",
        address: event.address || "",
        eventStage: event?.eventStage || "",
        eventType: event?.eventType || "",
        packageType: event?.packageType || "",
        minPackagePrice: event?.minPackagePrice || "",
        status: event?.status || "active",
      });
    }
  }, [event]);

  // Helper function to strip newlines and carriage returns
  const cleanHtmlString = (html) => {
    if (!html) return "";
    return html.replace(/[\r\n]+/gm, " ").trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const processedEmailTemplate = cleanHtmlString(form.emailTemplate);

    if (isEditMode) {
      formData.append("eventId", eventId || event?.id);

      Object.keys(form).forEach((key) => {
        let initialValue = event[key] ?? "";
        let currentValue = form[key];

        if (key === 'date') initialValue = formatDateForInput(event.date);
        if (key === 'minPackagePrice') initialValue = String(event.minPackagePrice ?? "");
        
        if (key === 'emailTemplate') {
          initialValue = cleanHtmlString(event.emailTemplate || "");
          currentValue = processedEmailTemplate;
        }

        if (String(currentValue) !== String(initialValue)) {
          formData.append(key, currentValue);
        }
      });

      if (bannerImage) formData.append("bannerImage", bannerImage);
      if (thumbImage) formData.append("thumbImage", thumbImage);

      await handleUpdateEvent(formData, eventId || event?.id);
    } else {
      Object.keys(form).forEach((key) => {
        if (key === "description") {
          formData.append(key, form[key] || "");
        } else if (key === "emailTemplate") {
          formData.append(key, processedEmailTemplate);
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

          {/* Email Template Container with Tab Controls */}
          <div className="grid gap-2 border rounded-lg p-4 bg-muted/5">
            <div className="flex items-center justify-between pb-2 border-b">
              <Label className="text-base font-semibold">Email Template (Pure HTML)</Label>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[220px]">
                <TabsList className="grid w-full grid-cols-2 h-9">
                  <TabsTrigger value="edit" className="text-xs flex items-center gap-1">
                    <Code className="h-3.5 w-3.5" /> HTML Code
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> Live View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Tabs value={activeTab} className="w-full mt-2">
              {/* Tab 1: Raw Code Input */}
              <TabsContent value="edit" className="m-0 space-y-2">
                <Textarea
                  id="emailTemplate"
                  placeholder="<div style='padding: 20px; background: #f4f4f4;'><h1>Order Confirmed!</h1></div>"
                  disabled={loading}
                  className="font-mono text-sm min-h-[200px] bg-background border border-input resize-y"
                  value={form.emailTemplate}
                  onChange={(e) => setForm({ ...form, emailTemplate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  All formatting linebreaks (`\n`) are stripped safely on submission.
                </p>
              </TabsContent>
              
              {/* Tab 2: The View Renderer */}
              <TabsContent value="preview" className="m-0">
                {form.emailTemplate ? (
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none min-h-[200px] p-4 bg-background border rounded-md overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: form.emailTemplate }}
                  />
                ) : (
                  <div className="flex items-center justify-center min-h-[200px] border border-dashed rounded-md text-muted-foreground text-sm bg-background">
                    No template code found. Paste HTML tags in the "HTML Code" panel to verify your rendering.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Row 3: Date, Time, Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
                type="time"
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

            <div className="grid gap-2">
              <Label htmlFor="packageType">Package Type *</Label>
              <Input
                id="packageType"
                placeholder="Team / Person"
                disabled={loading}
                value={form.packageType}
                onChange={(e) => setForm({ ...form, packageType: e.target.value })}
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
              <Label>Event Stage *</Label>
              <Select
                disabled={loading}
                value={form.eventStage}
                onValueChange={(val) => setForm({ ...form, eventStage: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
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