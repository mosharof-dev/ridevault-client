import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  

  return NextResponse.next();
}


export const config = {
  matcher: ["/my-added-cars",  "/add-car", "/my-bookings"],
};