import {
  createEvent,
  deleteDashboardEvent,
  getAllDashbaordEvents,
  getDashboardEventById,
  updateEvent,
} from "@/services/admin/admin.event.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// --- Hook to Create Event ---
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => createEvent(data),
    onSuccess: () => {
      // Refresh the list cache
      queryClient.invalidateQueries({ queryKey: ["dashboard-events"] });
      toast.success("Event created successfully!");
      router.push("/dashboard/events"); // Redirect to list
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create event");
    },
  });
};

// --- Hook to Update Event ---
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ eventId, data }) => updateEvent(eventId, data),
    onSuccess: (data, variables) => {
      // Invalidate the specific event and the full list
      queryClient.invalidateQueries({ queryKey: ["dashboard-events"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-event", variables.eventId],
      });

      toast.success("Event updated successfully!");
      router.push("/dashboard/events");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update event");
    },
  });
};

// --- 1. Hook to Fetch All Events ---
export const useEvents = () => {
  return useQuery({
    queryKey: ["dashboard-events"],
    queryFn: async () => {
      try {
        const res = await getAllDashbaordEvents();
        // Return the items array, or the data itself if it's already an array
        const data = res?.data?.items || res?.data || [];
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Query Error:", error);
        throw error;
      }
    },
    // Ensures that even with a 304, the UI refreshes
    refetchOnMount: true,
    staleTime: 5000, 
  });
};

// --- 2. Hook to Fetch One Event ---
export const useEvent = (eventId) => {
  return useQuery({
    queryKey: ["dashboard-event", eventId],
    queryFn: () =>
      getDashboardEventById(eventId).then((res) => res?.data?.data),
    enabled: !!eventId, // Only fetch if eventId exists
  });
};

// --- 3. Hook to Delete an Event ---
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId) => deleteDashboardEvent(eventId),
    onSuccess: () => {
      // This "invalidates" the cache, causing an automatic background refresh
      queryClient.invalidateQueries({ queryKey: ["dashboard-events"] });
      toast.success("Event deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });
};
