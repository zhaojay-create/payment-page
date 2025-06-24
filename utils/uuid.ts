// mock 用户唯一标识
export const getOrCreateUserId = (): string => {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID(); // 或用 UUID 库
    localStorage.setItem("userId", userId);
  }
  return userId;
};
