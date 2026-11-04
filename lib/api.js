import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const isValidValue = (value) =>
  Boolean(value) && value !== "undefined" && value !== "null";

// Helper to manage cookies on the client side
const setAuthCookie = (token) => {
  if (typeof window === "undefined" || !isValidValue(token)) return;

  const secure = window.location.protocol === "https:" ? "Secure;" : "";
  const role = localStorage.getItem("userRole");
  const cookieBase = `path=/; max-age=604800; SameSite=Lax; ${secure}`;

  // SameSite=Lax is important for CSRF protection
  document.cookie = `authToken=${token}; ${cookieBase}`;

  // Keep the role cookie in sync (middleware uses it for redirects).
  if (isValidValue(role)) {
    document.cookie = `userRole=${role}; ${cookieBase}`;
  }
};

const clearSession = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("authToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");

  document.cookie =
    "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie =
    "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

const redirectToLogin = () => {
  if (typeof window === "undefined") return;

  const role = (localStorage.getItem("userRole") || "").toLowerCase();
  const loginPath = role === "admin" ? "/admin/login" : "/accounts/login";

  clearSession();

  // Avoid a reload loop if the failing request originated on a login page.
  if (window.location.pathname !== loginPath) {
    window.location.href = loginPath;
  }
};

// Requests that should never trigger the refresh/logout flow.
const isAuthEntryPoint = (url = "") =>
  ["/auth/signin", "/auth/refresh", "/auth/otp", "/auth/forgot-password"].some(
    (path) => url.includes(path)
  );

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (isValidValue(token)) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthEntryPoint(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    // Admin sessions don't use the customer profile endpoint. If one is
    // called by mistake, a 401 there must never end the admin session.
    const role = (localStorage.getItem("userRole") || "").toLowerCase();
    if (role === "admin" && (originalRequest.url || "").includes("/auth/user")) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh_token");

    // No usable refresh token: the session cannot be recovered.
    if (!isValidValue(refreshToken)) {
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // NOTE: the backend reads the refresh token from the
      // Authorization header, not from the request body. Sending it in the
      // body returns 401, which used to wipe a perfectly valid session.
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        undefined,
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const payload = data?.data ?? data;
      const newToken = payload?.accessToken ?? payload?.token;
      const newRefreshToken = payload?.refreshToken ?? payload?.refresh_token;

      if (!isValidValue(newToken)) {
        throw new Error("Refresh response did not include an access token.");
      }

      localStorage.setItem("authToken", newToken);
      if (isValidValue(newRefreshToken)) {
        localStorage.setItem("refresh_token", newRefreshToken);
      }
      setAuthCookie(newToken); // Sync to cookie for Middleware

      api.defaults.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Only end the session when the refresh token is actually rejected.
      // Network/server hiccups should not log the user out.
      const refreshStatus = refreshError?.response?.status;
      if (refreshStatus === 401 || refreshStatus === 403 || !isValidValue(refreshToken)) {
        redirectToLogin();
      }
      return Promise.reject(refreshError);
    }
  }
);

export default api;
