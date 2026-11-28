"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDashboardOrganizerEvents } from "../../context/OrganizerEventContext";

const initialForm = {
  name: "",
  organizerName: "",
  description: "",
  date: "",
  time: "",
  address: "",
  eventType: "live",
  eventStage: "upcoming",
  status: "active",
  packageType: "person",
  minPackagePrice: "",
  imageDownloadUrl: "",
  certificateDownloadUrl: "",
  emailTemplate: "",
};

const toDateInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
};

export default function OrganizerEventForm({ event, mode = "create" }) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const { handleCreateEvent, handleUpdateEvent, loading } = useDashboardOrganizerEvents();
  const [form, setForm] = useState(initialForm);
  const [bannerImage, setBannerImage] = useState(null);
  const [thumbImage, setThumbImage] = useState(null);

  useEffect(() => {
    if (!event) return;
    setForm({
      name: event.name || "",
      organizerName: event.organizerName || "",
      description: event.description || "",
      date: toDateInput(event.date),
      time: event.time || "",
      address: event.address || "",
      eventType: event.eventType || "live",
      eventStage: event.eventStage || "upcoming",
      status: event.status || "active",
      packageType: event.packageType || "person",
      minPackagePrice: event.minPackagePrice ?? "",
      imageDownloadUrl: event.imageDownloadUrl || "",
      certificateDownloadUrl: event.certificateDownloadUrl || "",
      emailTemplate: event.emailTemplate || "",
    });
  }, [event]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["name", "date", "time", "address", "eventType", "eventStage", "organizerName"];
    if (required.some((k) => !String(form[k] || "").trim())) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (isEdit) {
      const original = {
        name: event?.name || "",
        organizerName: event?.organizerName || "",
        description: event?.description || "",
        date: toDateInput(event?.date),
        time: event?.time || "",
        address: event?.address || "",
        eventType: event?.eventType || "live",
        eventStage: event?.eventStage || "upcoming",
        status: event?.status || "active",
        packageType: event?.packageType || "person",
        minPackagePrice: event?.minPackagePrice ?? "",
        imageDownloadUrl: event?.imageDownloadUrl || "",
        certificateDownloadUrl: event?.certificateDownloadUrl || "",
        emailTemplate: event?.emailTemplate || "",
      };

      const changedKeys = Object.keys(form).filter(
        (key) => String(form[key] ?? "") !== String(original[key] ?? ""),
      );
      const bannerChanged = bannerImage instanceof File;
      const thumbChanged = thumbImage instanceof File;

      if (changedKeys.length === 0 && !bannerChanged && !thumbChanged) {
        toast.info("No changes to update");
        return;
      }

      // PATCH: send only changed fields/files to avoid backend duplicate-name validation on unchanged name.
      const fd = new FormData();
      fd.append("eventId", String(event.id));
      changedKeys.forEach((key) => fd.append(key, form[key] ?? ""));
      if (bannerChanged) fd.append("bannerImage", bannerImage);
      if (thumbChanged) fd.append("thumbImage", thumbImage);

      const result = await handleUpdateEvent(fd, event.id, { silent: true });
      if (result?.ok) {
        toast.success("Event updated successfully!");
        router.push("/organizer/events");
        return;
      }

      toast.error(result?.message || "Failed to update event");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value ?? ""));
    fd.append("bannerImage", bannerImage || "");
    fd.append("thumbImage", thumbImage || "");

    const createdId = await handleCreateEvent(fd);
    if (createdId) {
      router.push("/organizer/events");
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Event" : "Create Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Event Name *"><Input value={form.name} onChange={(e) => setField("name", e.target.value)} /></Field>
            <Field label="Organizer Name *"><Input value={form.organizerName} onChange={(e) => setField("organizerName", e.target.value)} /></Field>
            <Field label="Date *"><Input type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} /></Field>
            <Field label="Time *"><Input type="time" value={form.time} onChange={(e) => setField("time", e.target.value)} /></Field>
            <Field label="Address *" className="md:col-span-2"><Input value={form.address} onChange={(e) => setField("address", e.target.value)} /></Field>
            <Field label="Event Type *">
              <Select value={form.eventType} onValueChange={(v) => setField("eventType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="live">Live</SelectItem><SelectItem value="virtual">Virtual</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="Event Stage *">
              <Select value={form.eventStage} onValueChange={(v) => setField("eventStage", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="upcoming">Upcoming</SelectItem><SelectItem value="ongoing">Ongoing</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <Select value={form.status} onValueChange={(v) => setField("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="pending">Pending</SelectItem></SelectContent>
              </Select>
            </Field>
            <Field label="Package Type"><Input value={form.packageType} onChange={(e) => setField("packageType", e.target.value)} placeholder="person" /></Field>
            <Field label="Min Package Price"><Input type="number" value={form.minPackagePrice} onChange={(e) => setField("minPackagePrice", e.target.value)} /></Field>
            <Field label="Image Download URL"><Input value={form.imageDownloadUrl} onChange={(e) => setField("imageDownloadUrl", e.target.value)} /></Field>
            <Field label="Certificate Download URL"><Input value={form.certificateDownloadUrl} onChange={(e) => setField("certificateDownloadUrl", e.target.value)} /></Field>
            <Field label="Banner Image"><Input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files?.[0] || null)} /></Field>
            <Field label="Thumb Image"><Input type="file" accept="image/*" onChange={(e) => setThumbImage(e.target.files?.[0] || null)} /></Field>
          </div>

          <Field label="Description">
            <Textarea rows={4} value={form.description} onChange={(e) => setField("description", e.target.value)} />
          </Field>
          <Field label="Email Template">
            <Textarea rows={5} value={form.emailTemplate} onChange={(e) => setField("emailTemplate", e.target.value)} className="font-mono text-xs" />
          </Field>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="ghost" onClick={() => router.push("/organizer/events")}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : isEdit ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}