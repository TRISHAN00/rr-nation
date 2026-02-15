import api from "@/lib/api";

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/signin", data);

  const { accessToken } = response.data;

  if (accessToken) {
    // Client storage (optional but fine)
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("userRole", "admin");

    // Cookies for middleware
    document.cookie = `authToken=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `userRole=admin; path=/; max-age=604800; SameSite=Lax`;
  }

  return response;
};


export const logoutAdmin = () => {
  // Clear only admin-related storage
  localStorage.removeItem("authToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userData");
  localStorage.removeItem("userRole");

  // Remove cookies (middleware relies on this)
  document.cookie =
    "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie =
    "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // Redirect admin to admin login
  window.location.href = "/admin/login";
};
