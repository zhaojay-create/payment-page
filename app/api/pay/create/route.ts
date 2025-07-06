import { createAlipayOrder } from "@/lib/pay/alipay";
import { NextResponse } from "next/server";

export async function GET() {
  const alipayUrl = await createAlipayOrder({
    outTradeNo: "ORDER12345678",
    totalAmount: 3,
    subject: "商圈扫码支付",
    returnUrl: "http://localhost:3000/success", // 支付后同步回跳地址
    notifyUrl: "https://yourdomain.com/api/pay/notify", // 支付结果异步通知
  });

  // return NextResponse.redirect(alipayUrl);
  return NextResponse.json({ message: "链接生成成功", alipayUrl });
}
