import { Coupon } from "@/prisma/lib/generated/prisma";

export function serializeCoupon(coupon: Coupon) {
  return {
    ...coupon,
    amount: coupon.amount.toNumber(),
    expiredAt: coupon.expiredAt.toISOString(),
    issuedAt: coupon.issuedAt.toISOString(),
  };
}
