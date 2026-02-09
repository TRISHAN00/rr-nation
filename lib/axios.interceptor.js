import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        if (typeof window !== "undefined") {
          window.location.href = "/member-register";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
