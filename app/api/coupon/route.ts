import { getUserCoupons } from "@/lib/coupon";

export async function GET(request: Request) {
  try {
    const userId = "84783ce0-7e1d-4662-b079-b46709fa9544";
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    const coupons = await getUserCoupons(userId);
    // return new Response(JSON.stringify(coupons), { status: 200 });
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
