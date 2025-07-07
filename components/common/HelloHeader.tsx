import { getUser } from "@/lib/auth/dal";

async function HelloHeader() {
  const user = await getUser();

  return <div className="text-xl font-bold">👋 欢迎回来，{user?.name}</div>;
}

export default HelloHeader;
