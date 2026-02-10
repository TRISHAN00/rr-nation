import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper to sync token to cookies for Middleware
const setAuthCookie = (token) => {
  if (typeof window !== "undefined") {
    // Setting cookie for 7 days
    const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, { refreshToken });
        
        const newToken = data.data.accessToken; 

        localStorage.setItem("authToken", newToken);
        setAuthCookie(newToken);

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;