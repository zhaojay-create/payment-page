import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/auth/jwt";

// 1. 指定要保护的路由，和公共路由
const protectedRoutes = ["/pay", "dashboard"];
const publicRoutes = ["/login", "/"];

export async function middleware(request: NextRequest) {
  // 2.检查路径是否是需要保护的路由，匹配是否属于受保护路径
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  // 3. 检查用户是否登录
  const cookie = (await cookies()).get("session")?.value;
  const session = await verifyJwt(cookie);

  // 4. 如果是受保护路由，检查用户是否登录
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectUrl", path); // 👈 设置 redirect 参数
    return NextResponse.redirect(redirectUrl);
  }

  // 5. 如果是公共路由，用户登录了，还要去登录页面，就定义到首页
  // 如果用户已经登录了，还去访问 /login、/ 这种“公共页面”，
  // 并且当前访问的路径不是 /pay/** 也不是 /dashboard/**，
  // 就把他重定向回 /dashboard，不让他再去登录页。
  if (
    isPublicRoute &&
    session &&
    !path.startsWith("/pay") &&
    !path.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
