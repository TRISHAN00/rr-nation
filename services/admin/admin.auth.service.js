import api from "@/lib/api";

const SESSION_MAX_AGE = 604800; // 7 days

/**
 * The backend wraps auth data differently depending on the endpoint/version:
 *   { data: { token, refreshToken, userData } }
 *   { accessToken, refreshToken, user }
 * This normalises both shapes.
 */
const readAuthPayload = (response) => {
  const body = response?.data ?? {};
  const payload = body.data ?? body;

  return {
    token:
      payload.token ??
      payload.accessToken ??
      body.token ??
      body.accessToken ??
      null,
    refreshToken:
      payload.refreshToken ??
      payload.refresh_token ??
      body.refreshToken ??
      body.refresh_token ??
      null,
    userData:
      payload.userData ?? payload.user ?? body.userData ?? body.user ?? null,
  };
};

const isValidValue = (value) =>
  Boolean(value) && value !== "undefined" && value !== "null";

export const setAdminSession = ({ token, refreshToken, userData }) => {
  if (!isValidValue(token)) return false;

  // Drop any previous (possibly user) session so stale values never leak
  // into the new admin session.
  localStorage.removeItem("authToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");

  // Client storage (used by the axios request interceptor)
  localStorage.setItem("authToken", token);
  localStorage.setItem("userRole", "admin");
  if (isValidValue(refreshToken)) {
    localStorage.setItem("refresh_token", refreshToken);
  }
  if (userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  // Cookies (read by middleware.js)
  const cookieBase = `path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
  document.cookie = `authToken=${token}; ${cookieBase}`;
  document.cookie = `userRole=admin; ${cookieBase}`;

  return true;
};

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/signin", data);
  const auth = readAuthPayload(response);

  if (!setAdminSession(auth)) {
    throw new Error("Login succeeded but no access token was returned.");
  }

  return auth;
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
