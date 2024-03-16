import { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = getCookie("token", { cookies });
  if (!token) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ["/dashboard"],
};