import { getUser } from "@/lib/auth/dal";
import { createAlipayOrder } from "@/lib/pay/alipay";
import prisma from "@/lib/prisma";
import { OrderStatus } from "@/prisma/lib/generated/prisma";
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
        { status: 400 }
      );
    }
    if (!merchantId) {
      return NextResponse.json(
        { success: false, message: "参数错误, 商户ID不能为空" },
        { status: 400 }
      );
    }
    // 2. 获取到用户
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "用户未登录" },
        { status: 401 }
      );
    }
    // 3. 创建订单
    const order = await prisma.order.create({
      data: {
        originalAmount: amount,
        status: OrderStatus.pending,
        amount,
        merchantId,
        userId: user.id,
        couponId,
      },
    });
    // 3.生成支付链接
    const alipayUrl = await createAlipayOrder({
      outTradeNo: order.id,
      totalAmount: 3,
      subject: "商圈扫码支付",
      returnUrl: "http://localhost:3000/success", // 支付后同步回跳地址
      // notifyUrl: "https://yourdomain.com/api/pay/notify", // 支付结果异步通知
    });

    // 3. 给下单的用户，创建新的优惠券

    // 示例返回
    return NextResponse.json({
      success: true,
      message: "订单创建成功",
      order: body,
    });
  } catch (error) {
    console.error("error: create order error", error);
    return NextResponse.json(
      { success: false, message: "参数错误或服务器异常" },
      { status: 400 }
    );
  }
}
