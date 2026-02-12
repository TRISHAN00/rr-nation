import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/accounts/login" || pathname === "/accounts/register";
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  // 1. If trying to access dashboard without token -> Login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/accounts/login", request.url));
  }

  // 2. If logged in and trying to access login page -> Dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Add all routes you want the middleware to run on
  matcher: ["/dashboard/:path*", "/profile/:path*", "/accounts/login", "/accounts/register"],
};