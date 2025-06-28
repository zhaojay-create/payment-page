// app/api/order/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/get-user";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  const userId = user?.id as string;

  const body = await req.json(); // 获取请求体
  const { merchantId, amount, couponId } = body;

  if (!merchantId || !amount) {
    return NextResponse.json({ error: "缺少参数" }, { status: 400 });
  }

  // 获取优惠券金额（如果使用了优惠券）
  const originalAmount = Number(amount);
  let finalAmount = originalAmount;

  if (couponId) {
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!coupon || coupon.status !== "unused") {
      return NextResponse.json({ error: "无效优惠券" }, { status: 400 });
    }

    finalAmount = Math.max(originalAmount - Number(coupon.amount), 0);
  }

  // ✅：创建订单
  const order = await prisma.order.create({
    data: {
      userId,
      merchantId,
      originalAmount,
      amount: finalAmount,
      status: "completed",
      couponId: couponId || undefined,
    },
  });

  // ✅ ：标记优惠券为已使用
  if (couponId) {
    await prisma.coupon.update({
      where: { id: couponId },
      data: {
        status: "used",
        usedAt: new Date(),
        orderId: order.id,
        usedMerchantId: merchantId,
      },
    });
  }

  // ✅：为用户基于当前订单新建一个优惠券
  await prisma.coupon.create({
    data: {
      userId,
      fromMerchantId: merchantId,
      amount: Math.floor(finalAmount * 0.1),
      status: "unused",
      usedAt: null,
      orderId: null,
      usedMerchantId: null,
      couponType: "cashback", // 返利券
      title: `返利优惠券(${order.id.slice(-4)})`, // 或根据需要动态生成
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 例如30天后过期
    },
  });

  return NextResponse.json({ success: true, order });
}
