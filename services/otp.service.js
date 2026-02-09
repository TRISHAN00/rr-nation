import api from "@/lib/axios.interceptor";

export const sendOtp = (data) => {
  return api.post("/auth/otp/send", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/otp/verify", data);
};