import api from "@/lib/api";

// Create Event
export const createTicket = (data) => {
  return api.post("/admin/ticket", data);
};