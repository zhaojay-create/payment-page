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
      returnUrl: "http://localhost:3000/success", // 支付后同步回跳地址
      notifyUrl: "https://1676-1-192-59-247.ngrok-free.app/api/pay/notify", // 支付结果异步通知
    });

    return NextResponse.json({
      success: true,
      message: "链接生成成功",
      alipayUrl,
    });
    // return NextResponse.redirect(alipayUrl);

    // // 5. 更新优惠券状态
    //   if (coupon) {
    //     await prisma.coupon.update({
    //       where: { id: coupon.id },
    //       data: { status: CouponStatus.used },
    //     });
    //   }

    //   // 6. 给下单的用户，创建新的优惠券
    //   const couponAmout = Math.floor(finalAmount / 10).toFixed(2);
    //   const cashbackCoupon = await prisma.coupon.create({
    //     data: {
    //       userId: user.id,
    //       fromMerchantId: merchantId,
    //       amount: couponAmout,
    //       status: CouponStatus.unused,
    //       couponType: CouponType.cashback,
    //       title: "下单返现券",
    //       expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //     },
    //   });

    //   // 示例返回
    //   return NextResponse.json({
    //     success: true,
    //     message: "订单创建成功",
    //     orderId: order.id,
    //     cashbackCoupon,
    //     // user,
    //   });
  } catch (error) {
    console.error("error: create order error", error);
    return NextResponse.json(
      { success: false, message: "参数错误或服务器异常" },
      { status: 500 }
    );
  }
}
