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