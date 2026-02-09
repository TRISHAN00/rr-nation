import api from "@/lib/axios.interceptor";

// LOGIN
export const loginUser = (data) => {
  return api.post("/auth/signin", data);
};

/* REGISTER */
export const registerUser = (data) => {
  return api.post("/auth/user", data);
};

/* CURRENT USER */
export const getCurrentUser = () => {
  return api.get("/auth/user");
};

/* LOGOUT */
export const logoutUser = (deviceId) => {
  return api.post("/auth/user/signout", { deviceId });
};

/* CHANGE PASSWORD */
export const changePassword = (data) => {
  return api.post("/auth/user/change-password", data);
};
