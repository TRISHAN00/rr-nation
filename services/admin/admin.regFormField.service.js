import api from "@/lib/api";

// GET Registration Form Fields by EventID
export const getRegistrationFormFields = async (eventId) => {
    const { data } = await api.get(`/admin/registration-form-field/${eventId}`);
    return data;
};


// POST Create Registration Form Fields
export const createRegistrationFields = async (fields) => {
    const { data } = await api.post(`/admin/registration-form-field`, fields);
    return data;
};

// PATCH Update Registration Form Field by ID
export const updateRegistrationField = async (field) => {
    const { data } = await api.patch(`/admin/registration-form-field`, field);
    return data;
};

// DELETE Registration Form Field by ID
export const deleteRegistrationField = async (registrationFormFieldId) => {
    return await api.delete(`/admin/registration-form-field/${registrationFormFieldId}`);
};