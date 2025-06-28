import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";

export async function getUserFromCookie() {
  // cookies 只能在服务端使用，不能在客户端使用
  // 在服务端，next.js 能直接访问 HTTP 请求头（包括 cookie）,next.js 会自动把请求头传递给 cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyJwt(token);
}
