import api from "@/lib/api";

export const loginUser = async (data) => {
  const response = await api.post("/auth/signin", data);
  const token = response.data.accessToken;

  if (token) {
    // Client storage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", "user");

    // Cookie for middleware
    document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `userRole=user; path=/; max-age=604800; SameSite=Lax`;
  }

  return response;
};


export const logoutUser = () => {
  // Clear client storage
  localStorage.removeItem("authToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");

  // Clear cookies
  document.cookie =
    "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie =
    "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // Redirect (middleware will handle final destination)
  window.location.href = "/accounts/login";
};


/* REGISTER */
export const registerUser = (data) => {
  return api.post("/auth/user", data);
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};
