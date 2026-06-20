import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const role = request.cookies.get("userRole")?.value;
  const { pathname } = request.nextUrl;

  const isUserLogin = pathname.startsWith("/accounts/login");
  const isAdminLogin = pathname.startsWith("/admin/login");

  const isDashboard = pathname.startsWith("/dashboard");
  const isProfile = pathname.startsWith("/profile");
  const isOrganizer = pathname.startsWith("/organizer");
  const isMemberRegister = pathname.startsWith("/member-register");

  /* ---------- NOT LOGGED IN ---------- */
  if (!token) {
    if (isDashboard || isProfile || isOrganizer || isMemberRegister) {
      return NextResponse.redirect(
        new URL("/accounts/login", request.url)
      );
    }
    return NextResponse.next();
  }

  /* ---------- LOGGED IN ---------- */

  // Block ALL login pages after login
  if (isUserLogin || isAdminLogin) {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  // User trying to access admin dashboard
  if (role === "user" && isDashboard) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/accounts/login",
    "/admin/login",
    "/dashboard/:path*",
    "/profile/:path*",
    "/organizer/:path*",
    "/member-register",
  ],
};