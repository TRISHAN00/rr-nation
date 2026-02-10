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

// Add this to your auth service or a custom hook
export const performLogout = () => {
  localStorage.clear();
  // Clear cookie
  document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  // Force a hard reload to clear all internal React states
  window.location.href = "/login";
};