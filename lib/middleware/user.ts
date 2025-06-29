import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../auth/jwt";

export const authUserMiddleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  // 把相对路径转换成绝对路径，使用 URL 对象
  if (!token) {
    return NextResponse.redirect(new URL("/h5pay/login", request.url));
  }

  const payload = await verifyJwt(token);
  if (!payload || payload.role !== "user") {
    return NextResponse.redirect(new URL("/h5pay/login", request.url));
  }

  return NextResponse.next();
};
