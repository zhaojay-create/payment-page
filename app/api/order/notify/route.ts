import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { MyAlipaySdk } from "@/lib/pay/alipay";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());
  // 1.验签
  const isVerified = MyAlipaySdk.checkNotifySign(data);

  if (!isVerified || data.trade_status !== "TRADE_SUCCESS") {
    return new Response("fail");
  }

  const orderId = data.out_trade_no as string;

  // 2.查询订单
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  // 如果订单不存在，或者已经完成，返回 success
  if (!order || order.status === "completed") {
    return new Response("success");
  }

  const finalAmount = Number(order.amount);
  const couponId = order.couponId;

  try {
    // 3. 更新订单状态
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "completed" },
    });

    // 4. 使用掉旧优惠券（如果有）
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { status: "used", usedAt: new Date(), orderId: order.id },
      });
    }

    // 5. 生成新的返利券
    const cashbackAmount =
      Number(Number(finalAmount / 10).toFixed(2)) > 0
        ? Number(Number(finalAmount / 10).toFixed(2))
        : 0.01;
    await prisma.coupon.create({
      data: {
        userId: order.userId,
        fromMerchantId: order.merchantId,
        amount: cashbackAmount,
        status: "unused",
        couponType: "cashback",
        title: `返利券${order.id.slice(-4)}`,
        description: `come from order ${order.id}`,
        sourceOrderId: order.id,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    console.log("notify success, 生成了返利券");
    return new Response("success"); // 必须返回 success，否则支付宝会重试
  } catch (e) {
    console.error("notify fail", e);
    return new Response("fail");
  }
}
