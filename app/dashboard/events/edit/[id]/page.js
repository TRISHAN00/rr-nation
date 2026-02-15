"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import EventInfoForm from "@/app/dashboard/events/create/_components/EventInfoForm";
import {
  getEventById,
  updateEvent,
} from "@/services/admin/admin.event.service";
import EventInfoFormSkeleton from "../../create/_components/EventInfoFormSkeleton";
import EventTickets from "../../create/_components/EventTickets";
import { TShirtSizeManager } from "../../create/_components/TShirtSizeManager";

export default function DashboardEventEdit() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res?.data?.data);
    } catch (err) {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateEvent(id, formData);
      toast.success("Event updated successfully");
      router.push("/admin/events");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <EventInfoFormSkeleton />;

  return (
    <div className="space-y-6">
      <EventInfoForm event={event} onSubmit={handleUpdate} isEdit />

      <EventTickets eventId={id} />

      <TShirtSizeManager/>
    </div>
  );
}
