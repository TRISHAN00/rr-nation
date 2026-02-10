import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Define Public vs Protected paths
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedRoute = pathname.startsWith("/profile") || pathname.startsWith("/dashboard") || pathname.startsWith("/events/");

  // 2. Redirect logic
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // Optional: save the intended destination to redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/login", "/register"],
};