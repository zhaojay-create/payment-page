import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../auth/session";

export async function authMerchantMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // 把相对路径转换成绝对路径，使用 URL 对象
  if (!token) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  const payload = await verifyJwt(token);
  if (!payload || payload.role !== "merchant") {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}
