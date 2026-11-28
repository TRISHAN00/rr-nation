import api from "@/lib/api";

export const createOrganizerTicket = (payload) => {
  return api.post("/organizer/ticket", payload);
};

export const updateOrganizerTicket = (eventId, payload) => {
  return api.patch(`/organizer/ticket/${eventId}`, payload);
};

export const getOrganizerTicketsByEventId = (eventId) => {
  return api.get(`/organizer/ticket/${eventId}`);
};

export const deleteOrganizerTicket = (ticketId) => {
  return api.delete(`/organizer/ticket/${ticketId}`);
};
