import api from "@/lib/api";

export const sendOtp = (data) => {
  return api.post("/auth/otp/send", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/otp/verify", data);
};