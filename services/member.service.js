import api from "@/lib/api";

// Member Registration 
export const registerMember = async (payload) => {
  const { data } = await api.post("/member/registration", payload);
  console.log(data)
  return data;
};


// Get All Members in the Website
export const getAllMembers = async (page, limit, memberType) => {
  const { data } = await api.get(`/member/team?page=${page}&limit=${limit}&memberType=${memberType}`)
  return data;
}

// Member Registration (GET)
export const getMemberRegInfo = async () => {
  const { data } = await api.get(`/member/registration`)
  return data;
}