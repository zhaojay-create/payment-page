import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "已登出" });
  res.cookies.set("token", "", { path: "/", maxAge: 0 });
  return res;
}
