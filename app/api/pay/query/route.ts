import { queryAlipayOrder } from "@/lib/pay/alipay";
import { NextResponse } from "next/server";

export async function GET() {
  // const alipayUrl = await createAlipayOrder({
  //   outTradeNo: "ORDER1234567",
  //   totalAmount: 2,
  //   subject: "商圈扫码支付",
  //   // returnUrl: "http://localhost:3000/pay/success", // 支付后同步回跳地址
  //   // notifyUrl: "https://yourdomain.com/api/pay/notify", // 支付结果异步通知
  // });

  const res = await queryAlipayOrder("ORDER12345678");
  // return NextResponse.redirect(alipayUrl);
  return NextResponse.json({ message: "查询", res });
}
