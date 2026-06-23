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

// GET Member Registration Fee
export const getMemRegFee = async () => {
  const { data } = await api.get(`/member/registration/fee`);
  return data;
}

// /member/registration/coupon/apply
export const applyMemberCoupon = async (coupon) => {
  const { data } = await api.post(`/member/registration/coupon/apply`, {
    coupon,
  });

  return data;
};

export const createMemberPayment = async (payload) => {
  const { data } = await api.post(
    `/member/registration/payment`,
    payload
  );

  return data;
};

// POST add member event 
export const addMemberEvent = async (payload) => {
  const { data } = await api.post(
    `/member/event`,
    payload
  );
  return data;
};

// GET all member event tracks 
export const getMemberEvents = async (page = 1, limit = 10, search, startDate, endDate) => {
  const { data } = await api.get(`/member/event`, {
    params: {
      page,
      limit,
      search: search || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  });
  return data;
}

// PATCH update member event by id
export const updateMemberEventById = async (id, payload) => {
  const { data } = await api.patch(
    `/member/event/${id}`,
    payload
  );
  return data;
}

// DELETE member event by id
export const deleteMemberEventById = async (id) => {
  const { data } = await api.delete(
    `/member/event/${id}`
  );
  return data;
}