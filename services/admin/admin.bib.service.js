import api from "@/lib/api";

export default {
  async getBibNumber(participantId) {
    const response = await api.get(`/admin/order/participant/${participantId}/bib-number`);
    return response.data;
  },

  // 🔥 Added for BIB Assignment
  async assignBibNumber(orderItemId, bibNumber, file = null) {
    const formData = new FormData();
    formData.append("orderItemId", String(orderItemId));
    formData.append("bibNumber", bibNumber);
    
    if (file) {
      formData.append("file", file);
    }

    const response = await api.post("/admin/order/participant/bib-number", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};