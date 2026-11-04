import api from "@/lib/api";

const SESSION_MAX_AGE = 604800; // 7 days

const isValidValue = (value) =>
  Boolean(value) && value !== "undefined" && value !== "null";

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

const setUserSession = ({ token, refreshToken, userData }) => {
  if (!isValidValue(token)) return false;

  // Drop any previous (possibly admin) session so stale values never leak
  // into the new user session.
  localStorage.removeItem("authToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");

  localStorage.setItem("authToken", token);
  localStorage.setItem("userRole", "user");
  if (isValidValue(refreshToken)) {
    localStorage.setItem("refresh_token", refreshToken);
  }
  if (userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  const cookieBase = `path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
  document.cookie = `authToken=${token}; ${cookieBase}`;
  document.cookie = `userRole=user; ${cookieBase}`;

  return true;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/signin", data);

  // Persist the session here too, so standalone callers (and stale
  // admin/user role values from previous sessions) stay consistent.
  setUserSession(readAuthPayload(response));

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
