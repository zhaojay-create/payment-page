import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";

// 把字符串类型的 JWT_SECRET 转换为 Uint8Array（二进制字节数组）
// 这是因为 jose 这样的 JWT 库在加密/解密时，要求密钥必须是字节数组格式，而不是普通字符串
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// 生成 JWT
export async function signJwt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// 验证 JWT
export async function verifyJwt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, JWT_SECRET);
    return payload;
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("Error verifying JWT:", error.message);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await signJwt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await verifyJwt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
