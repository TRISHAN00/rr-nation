"use client";

import {
  createEvent,
  deleteDashboardEvent,
  getAllDashbaordEvents,
  getDashboardEventById,
  updateEvent,
} from "@/services/admin/admin.event.service";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const EventContext = createContext(null);

export default function EventProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const router = useRouter();

  // --- FETCH ALL EVENTS ---
  const fetchEvents = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const response = await getAllDashbaordEvents();
      setEvents(response?.data?.items || []);
    } catch (err) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // --- CREATE EVENT ---
  const handleCreateEvent = useCallback(async (formData) => {
    try {
      setLoading(true);
      const res = await createEvent(formData);
      toast.success("Event created successfully!");
      await fetchEvents();
      return res?.data?.data?.id || res?.data?.id; // Return ID for step progression
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create event");
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  // --- UPDATE EVENT ---
  const handleUpdateEvent = useCallback(async (eventId, formData) => {
    console.log('clicked...', formData)
    try {
      setLoading(true);
      await updateEvent(eventId, formData);
      toast.success("Event updated successfully!");
      
      // Refresh list and individual event state
      await fetchEvents();
      const res = await getDashboardEventById(eventId);
      setEvent(res?.data?.data || null);
      
      router.push("/dashboard/events");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  }, [fetchEvents, router]);

  // --- GET EVENT BY ID ---
  const handleGetEventById = useCallback(async (eventId) => {
    try {
      setLoading(true);
      const res = await getDashboardEventById(eventId);
      setEvent(res?.data?.data || null);
    } catch (err) {
      toast.error("Failed to get event details");
    } finally {
      setLoading(false);
    }
  }, []);

  // --- DELETE EVENT ---
  const handleDeleteDashboardEvent = useCallback(async (eventId) => {
    try {
      setLoading(true);
      await deleteDashboardEvent(eventId);
      toast.success("Event deleted successfully");
      await fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  return (
    <EventContext.Provider
      value={{
        events,
        event,
        loading,
        fetchEvents,
        handleCreateEvent,
        handleUpdateEvent,
        handleDeleteDashboardEvent,
        handleGetEventById,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useDashboardEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useDashboardEvents must be used inside EventProvider");
  return context;
};