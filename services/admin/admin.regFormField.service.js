import api from "@/lib/api";

// GET Registration Form Fields by EventID
export const getRegistrationFormFields = async (eventId) => {
    const { data } = await api.get(`/admin/registration-form-field/${eventId}`);
    return data;
};
