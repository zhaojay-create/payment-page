import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/auth/session";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = token ? await verifyJwt(token) : null;

  if (!payload) {
    redirect("/login");
  }

  if (payload.role === "admin") {
    redirect("/admin");
  } else if (payload.role === "merchant") {
    redirect("/merchant");
  } else {
    redirect("/login");
  }
};

export default Page;
