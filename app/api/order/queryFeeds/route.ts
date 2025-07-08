import { getUser } from "@/lib/auth/dal";
import prisma from "@/lib/prisma";
import { getDateRange } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. 获取用户
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "未登录" }, { status: 401 });
    // 2. 获取查询参数, 分页
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const take = 6;
    const skip = (page - 1) * take;
    // 3. 查询参数, 根据关键字和时间范围
    const keyword = searchParams.get("keyword") || "";
    const range = searchParams.get("range") || "";
    // 4. 查询
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: getDateRange(range) },
        merchant: {
          name: { contains: keyword },
        },
      },
      include: { merchant: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("error: queryFeeds orders", error);
    return NextResponse.json(
      { success: false, message: "服务器异常: api/order/queryFeeds" },
      { status: 500 }
    );
  }
}
