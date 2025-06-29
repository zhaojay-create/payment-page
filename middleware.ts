import { NextRequest, NextResponse } from "next/server";
import { authUserMiddleware } from "./lib/middleware/user";
import { authMerchantMiddleware } from "./lib/middleware/merchant";
import { authAdminMiddleware } from "./lib/middleware/admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/h5pay")) {
    return authUserMiddleware(request);
  }

  if (pathname.startsWith("/dashboard/merchant")) {
    return authMerchantMiddleware(request);
  }

  if (pathname.startsWith("/dashboard/admin")) {
    return authAdminMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/h5pay((?!/login).*)",
    "/dashboard/merchant((?!/login).*)",
    "/dashboard/admin((?!/login).*)",
  ],
};
