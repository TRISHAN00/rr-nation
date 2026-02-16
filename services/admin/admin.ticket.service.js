import api from "@/lib/api";

/* ---------- CREATE ---------- */
export const createTicket = (payload, isMultipart = false) => {
  return api.post("/admin/ticket", payload, {
    headers: {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  });
};

/* ---------- UPDATE ---------- */
export const updateTicket = (eventId, payload, isMultipart = false) => {
  return api.patch(`/admin/ticket/${eventId}`, payload, {
    headers: {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  });
};

/* ---------- GET BY EVENT ---------- */
export const getTicketsById = (eventId) => {
  return api.get(`/admin/ticket/${eventId}`);
};


// Delete Ticket
export const deleteTicket = (ticketId) => {
  return api.delete(`/admin/ticket/${ticketId}`);
};
