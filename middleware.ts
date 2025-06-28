import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLogin = request.nextUrl.pathname === "/login";

  if (!token && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const payload = await verifyJwt(token);
    if (!payload && !isLogin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|login).*)"],
};
