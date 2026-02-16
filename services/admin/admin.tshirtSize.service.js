import api from "@/lib/api";

/* ---------- CREATE ---------- */
export const createTshirtSizes = (payload, isMultipart = false) => {
  return api.post("/admin/t-shirt-size", payload, {
    headers: {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  });
};

/* ---------- GET BY SIZES BY EVENT ---------- */
export const getSizesById = (eventId) => {
  return api.get(`/admin/t-shirt-size/${eventId}`);
};

// Delete Ticket
export const deleteSize = (ticketId) => {
  return api.delete(`/admin/ticket/${ticketId}`);
};
