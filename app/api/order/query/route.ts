import { queryAlipayOrder } from "@/lib/pay/alipay";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (!orderId)
    return NextResponse.json({
      success: false,
      message: "缺少参数: orderId 不存在",
    });

  const alipayOrder = await queryAlipayOrder(orderId);
  const cashbackCoupon = await prisma.coupon.findFirst({
    where: { sourceOrderId: orderId },
  });

  return NextResponse.json({
    success: true,
    message: "查询成功",
    alipayOrder,
    cashbackCoupon,
  });
}
