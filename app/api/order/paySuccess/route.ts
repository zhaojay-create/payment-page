import { getUser } from "@/lib/auth/dal";
import { createAlipayOrder } from "@/lib/pay/alipay";
import prisma from "@/lib/prisma";
import {
  // CouponStatus,
  // CouponType,
  OrderStatus,
} from "@/prisma/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

// 示例：创建订单的 POST 接口
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // 1. 校验参数
    const { amount, merchantId, couponId } = body || {};
    if (!amount) {
      return NextResponse.json(
        { success: false, message: "参数错误, 金额不能为空" },
        { status: 500 }
      );
    }
    if (!merchantId) {
      return NextResponse.json(
        { success: false, message: "参数错误, 商户ID不能为空" },
        { status: 500 }
      );
    }
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    });
    if (!merchant) {
      return NextResponse.json(
        { success: false, message: "商户不存在" },
        { status: 400 }
      );
    }

    // 2.获取到用户
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "用户不存在" },
        { status: 500 }
      );
    }

    // 3. 查券是否存在，如果不存在，就返回错误
    let coupon = null;
    if (couponId) {
      try {
        coupon = await prisma.coupon.findUnique({
          where: { id: couponId, expiredAt: { gt: new Date() } },
        });
      } catch (error) {
        console.error("error: findUnique coupon", error);
        return NextResponse.json(
          { success: false, message: "优惠券不存在或已过期" },
          { status: 500 }
        );
      }
    }

    // 4. 创建订单
    const finalAmount = coupon
      ? Number(amount) - Number(coupon.amount)
      : amount;
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        merchantId,
        couponId: coupon ? coupon.id : null,
        originalAmount: amount,
        amount: finalAmount,
        status: OrderStatus.pending,
      },
    });

    // 5.生成支付链接
    const alipayUrl = await createAlipayOrder({
      outTradeNo: order.id,
      totalAmount: finalAmount,
      subject: "商圈扫码支付",
      returnUrl: "http://localhost:3000/pay/success", // 支付后同步回跳地址
      notifyUrl: "https://1676-1-192-59-247.ngrok-free.app/api/order/notify", // 支付结果异步通知
    });

    return NextResponse.json({
      success: true,
      message: "链接生成成功",
      alipayUrl,
    });
  } catch (error) {
    console.error("error: create order error", error);
    return NextResponse.json(
      { success: false, message: "参数错误或服务器异常" },
      { status: 500 }
    );
  }
}
