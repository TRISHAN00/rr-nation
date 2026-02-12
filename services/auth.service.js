import api from "@/lib/api";

export const loginUser = async (data) => {
  const response = await api.post("/auth/signin", data);
  const token = response.data.accessToken; // Adjust based on your API response
  
  if (token) {
    localStorage.setItem("authToken", token);
    // Set cookie so Middleware can see it
    document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax;`;
  }
  return response;
};

export const logoutUser = () => {
  localStorage.clear();
  document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.href = "/accounts/login";
};

/* REGISTER */
export const registerUser = (data) => {
  return api.post("/auth/user", data);
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};
