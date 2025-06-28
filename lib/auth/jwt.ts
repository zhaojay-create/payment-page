import { SignJWT, jwtVerify } from "jose";

// 把字符串类型的 JWT_SECRET 转换为 Uint8Array（二进制字节数组）
// 这是因为 jose 这样的 JWT 库在加密/解密时，要求密钥必须是字节数组格式，而不是普通字符串
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// 生成 JWT
export async function signJwt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// 验证 JWT
export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("Error verifying JWT:", error.message);
    return null;
  }
}
