import { getUserFromCookie } from "@/lib/auth/get-user";
import { getUserCoupons } from "@/lib/coupon";

export async function GET() {
  try {
    const user = await getUserFromCookie();
    const userId = user?.id as string; // 获取到用户 ID
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    const coupons = await getUserCoupons(userId);
    // 查询到用户的优惠券
    return Response.json({
      success: true,
      message: "Coupons fetched successfully",
      data: coupons,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("Error fetching coupons:", message);
    // 返回错误信息
    return new Response(`Error: ${message}`, { status: 500 });
  }
}
