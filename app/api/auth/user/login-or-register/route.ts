import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signJwt } from "@/lib/auth/session";

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  if (!phone && !password)
    return NextResponse.json(
      { error: "手机号和密码不能为空" },
      { status: 400 }
    );
  // 检查用户是否存在
  let user = await prisma.user.findUnique({ where: { phone } });
  // 如果用户不存在,创建一个
  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        name: `用户${phone.slice(-4)}`,
        password: "123123",
      },
    });
  }
  // 生成 token
  const token = await signJwt({
    id: user.id,
    phone: user.phone,
    role: "user",
  });
  // 返回 token，设置cookie
  // 告诉浏览器，把 token 写入用户本地 cookie 里。
  // 这会让响应头中包含：Set-Cookie: token=abc123; Path=/; HttpOnly; Max-Age=604800
  // 浏览器接收到这个响应，会在本地设置 cookie
  // 	之后的每次请求，只要请求路径匹配 path=/，就会自动带上这个 cookie
  const res = NextResponse.json({
    message: "登录成功",
    user: { ...user, role: "user" },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/",
  });

  return res;
}
