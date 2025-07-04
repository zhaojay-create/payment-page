import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../auth/session";

export async function authAdminMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // 把相对路径转换成绝对路径，使用 URL 对象
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyJwt(token);
  if (!payload || payload.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
