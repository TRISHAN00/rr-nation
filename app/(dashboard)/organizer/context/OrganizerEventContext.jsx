"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import {
  createOrganizerEvent,
  deleteOrganizerEvent,
  getAllOrganizerEvents,
  getOrganizerEventById,
  updateOrganizerEvent,
} from "../services/organizer.event.service";

const OrganizerEventContext = createContext(null);

export default function OrganizerEventProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [eventType, setEventType] = useState("");
  const [eventStage, setEventStage] = useState("");

  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllOrganizerEvents(page, limit);
      const data = response?.data || {};
      setEvents(data?.items || []);
      setTotalPages(data?.totalPages || 1);
      setTotalItems(data?.total || data?.count || 0);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    setPage(1);
  }, [search, eventStage, eventType]);

  const handleCreateEvent = useCallback(
    async (formData) => {
      try {
        setLoading(true);
        const res = await createOrganizerEvent(formData);
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

  const handleUpdateEvent = useCallback(
    async (formData, eventId, { silent = false } = {}) => {
      try {
        setLoading(true);
        await updateOrganizerEvent(formData);
        if (!silent) toast.success("Event updated successfully!");
        await fetchEvents();

        if (eventId) {
          const res = await getOrganizerEventById(eventId);
          setEvent(res?.data?.data || res?.data || null);
        }

        if (!silent) router.push("/organizer/events");
        return { ok: true };
      } catch (err) {
        if (!silent) {
          toast.error(err?.response?.data?.message || "Failed to update event");
        }
        return {
          ok: false,
          status: err?.response?.status,
          message: err?.response?.data?.message || err?.message,
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents, router],
  );

  const handleGetEventById = useCallback(async (eventId) => {
    try {
      setLoading(true);
      const res = await getOrganizerEventById(eventId);
      setEvent(res?.data?.data || res?.data || null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to get event details");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteDashboardEvent = useCallback(
    async (eventId) => {
      try {
        setLoading(true);
        await deleteOrganizerEvent(eventId);
        toast.success("Event deleted successfully");
        await fetchEvents();
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to delete event");
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents],
  );

  return (
    <OrganizerEventContext.Provider
      value={{
        events,
        event,
        search,
        setSearch,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        totalPages,
        totalItems,
        eventType,
        setEventType,
        eventStage,
        setEventStage,
        fetchEvents,
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
    throw new Error(
      "useDashboardOrganizerEvents must be used inside OrganizerEventProvider",
    );
  return context;
};
