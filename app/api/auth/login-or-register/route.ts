import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  const { phone, password, name } = await req.json();

  if (!phone || !password) {
    return NextResponse.json({ error: "手机号和密码必填" }, { status: 400 });
  }

  // 查找用户
  const existingUser = await prisma.user.findUnique({ where: { phone } });

  let user;

  if (existingUser) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "密码错误" }, { status: 401 });
    }
    user = existingUser;
  } else {
    const hashed = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        phone,
        password: hashed,
        name: name || `用户${phone.slice(-4)}`, // 默认用户名
      },
    });
  }

  // 登录成功，生成 token
  const token = signJwt({ id: user.id, phone: user.phone });

  const res = NextResponse.json({ message: "登录成功", userId: user.id });

  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/",
  });

  return res;
}
