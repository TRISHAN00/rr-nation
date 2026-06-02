"use client";

import {
  createEvent,
  deleteDashboardEvent,
  getAllDashbaordEvents,
  getDashboardEventById,
  updateEvent,
} from "@/services/admin/admin.event.service";
import { format } from "date-fns";
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

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isRunRiseNation, setIsRunRiseNation] = useState(true);
  const [eventType, setEventType] = useState("");
  const [eventStage, setEventStage] = useState("");
  const [date, setDate] = useState(null);

  console.log("event type", eventType);
  console.log("event stage", eventStage);

  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const formattedDateForAPI =
        date instanceof Date ? format(date, "MM/dd/yyyy") : "";
      const encodedDate = encodeURIComponent(formattedDateForAPI);

      const response = await getAllDashbaordEvents(
        page,
        limit,
        isRunRiseNation,
        search,
        encodedDate,
        eventStage === "all" ? "" : eventStage, // Correctly handles "all"
        eventType === "all" ? "" : eventType,   // Correctly handles "all"
      );

      setEvents(response?.data?.items || response?.items || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page, limit, isRunRiseNation, search, eventStage, eventType, date]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // --- CREATE EVENT ---
  const handleCreateEvent = useCallback(
    async (formData) => {
      try {
        setLoading(true);
        const res = await createEvent(formData);
        toast.success("Event created successfully!");
        await fetchEvents();
        return res?.data?.data?.id || res?.data?.id;
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to create event");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents],
  );

  // --- UPDATE EVENT ---
  const handleUpdateEvent = useCallback(
    async (formData, eventId) => { // Accept eventId as second param
      try {
        setLoading(true);
        await updateEvent(formData);
        toast.success("Event updated successfully!");

        // Refresh list
        await fetchEvents();

        // Refresh the single event state if we are in a detail view
        if (eventId) {
          const res = await getDashboardEventById(eventId);
          setEvent(res?.data?.data || res?.data || null);
        }

        router.push("/dashboard/events");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to update event");
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents, router],
  );

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
  const handleDeleteDashboardEvent = useCallback(
    async (eventId) => {
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
    },
    [fetchEvents],
  );

  // Inside EventProvider return:
  return (
    <EventContext.Provider
      value={{
        events,
        event,
        search,
        setSearch,
        loading,
        eventType,
        setEventType, // Added
        eventStage,   // Added
        setEventStage, // Added
        date,
        setDate,
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
  if (!context)
    throw new Error("useDashboardEvents must be used inside EventProvider");
  return context;
};
