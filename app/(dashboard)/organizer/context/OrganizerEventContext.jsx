"use client";


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
import { createOrganizerEvent, deleteDashboardOrganizerEvent, getAllDashboardOrganizerEvents, getDashboardOrganizerEventById, updateOrganizerEvent } from "../services/organizer.event.service";

const OrganizerEventContext = createContext(null);

export default function OrganizerEventProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isRunRiseNation, setIsRunRiseNation] = useState(true);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(null);

  const router = useRouter();

  const fetchOrganizerEvents = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) return;

    try {
      setLoading(true);
      const formattedDateForAPI =
        date instanceof Date ? format(date, "MM/dd/yyyy") : "";
      const encodedDate = encodeURIComponent(formattedDateForAPI);

      const response = await getAllDashboardOrganizerEvents(
        page,
        limit,
        isRunRiseNation,
        search,
        eventType === "all" ? "" : eventType,
        encodedDate,
      );

      setEvents(response?.data?.items || response?.items || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page, limit, isRunRiseNation, search, eventType, date]);

  useEffect(() => {
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);

  // --- CREATE EVENT ---
  const handleCreateEvent = useCallback(
    async (formData) => {
      try {
        setLoading(true);
        const res = await createOrganizerEvent(formData);
        toast.success("Event created successfully!");
        await fetchOrganizerEvents();
        return res?.data?.data?.id || res?.data?.id;
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to create event");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchOrganizerEvents],
  );

  // --- UPDATE EVENT ---
  const handleUpdateEvent = useCallback(
    async (formData, eventId) => { // Accept eventId as second param
      try {
        setLoading(true);
        await updateOrganizerEvent(formData);
        toast.success("Event updated successfully!");

        // Refresh list
        await fetchOrganizerEvents();

        // Refresh the single event state if we are in a detail view
        if (eventId) {
          const res = await getDashboardOrganizerEventById(eventId);
          setEvent(res?.data?.data || res?.data || null);
        }

        router.push("/dashboard/events");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to update event");
      } finally {
        setLoading(false);
      }
    },
    [fetchOrganizerEvents, router],
  );

  // --- GET EVENT BY ID ---
  const handleGetEventById = useCallback(async (eventId) => {
    try {
      setLoading(true);
      const res = await getDashboardOrganizerEventById(eventId);
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
        await deleteDashboardOrganizerEvent(eventId);
        toast.success("Event deleted successfully");
        await fetchOrganizerEvents();
      } catch (err) {
        toast.error("Failed to delete event");
      } finally {
        setLoading(false);
      }
    },
    [fetchOrganizerEvents],
  );

  return (
    <OrganizerEventContext.Provider
      value={{
        events,
        event,
        search,
        setSearch,
        loading,
        eventType,
        date,
        setDate,
        setEventType,
        fetchOrganizerEvents,
        handleCreateEvent,
        handleUpdateEvent,
        handleDeleteDashboardEvent,
        handleGetEventById,
      }}
    >
      {children}
    </OrganizerEventContext.Provider>
  );
}

export const useDashboardOrganizerEvents = () => {
  const context = useContext(OrganizerEventContext);
  if (!context)
    throw new Error("useDashboardOrganizerEvents must be used inside OrganizerEventProvider");
  return context;
};
