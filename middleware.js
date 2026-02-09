import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken");

  if (
    !token &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/member-register", request.url)
    );
  }

  return NextResponse.next();
}
