import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";

export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyJwt(token);
}
