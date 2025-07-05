import { getUser } from "@/lib/auth/dal";
import prisma from "@/lib/prisma";
import { CouponStatus } from "@/prisma/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "用户未登录" },
        { status: 401 }
      );
    }
    const coupons = await prisma.coupon.findMany({
      where: { userId: user.id, status: CouponStatus.unused },
      orderBy: { expiredAt: "asc" },
    });
    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error("error: query coupons", error);
    return NextResponse.json(
      { success: false, message: "服务器异常" },
      { status: 500 }
    );
  }
}

// 示例：创建订单的 POST 接口
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    getUser();
    // 1. 校验参数
    // const { amount, merchantId, couponId } = body || {};
    // if (!amount) {
    //   return NextResponse.json(
    //     { success: false, message: "参数错误, 金额不能为空" },
    //     { status: 400 }
    //   );
    // }
    // if (!merchantId) {
    //   return NextResponse.json(
    //     { success: false, message: "参数错误, 商户ID不能为空" },
    //     { status: 400 }
    //   );
    // }
    // // 2. 创建订单
    // const order = await prisma.order.create({
    //   data: {
    //     originalAmount: amount,
    //     status: OrderStatus.completed,
    //     amount,
    //     merchantId,
    //     couponId,
    //   },
    // });

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
