import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper to manage cookies on the client side
const setAuthCookie = (token) => {
  if (typeof window !== "undefined") {
    const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
    // SameSite=Lax is important for CSRF protection
    document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax; ${secure}`;
  }
};

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, { refreshToken });
        
        const newToken = data.data.accessToken; 
        localStorage.setItem("authToken", newToken);
        setAuthCookie(newToken); // Sync to cookie for Middleware

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, nuke everything
        localStorage.clear();
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/accounts/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;