import api from "@/lib/api";

export const registerOrganizer = async (payload) => {
    const { data } = await api.post("/organizer/registration", payload);
    console.log(data)
    return data;
};