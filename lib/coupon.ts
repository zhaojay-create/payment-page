// lib/prisma/coupon.ts
import { CouponStatus } from "@/prisma/lib/generated/prisma";
import prisma from "./prisma";

export async function getUserCoupons(
  userId: string,
  status: CouponStatus = "unused"
) {
  return await prisma.coupon.findMany({
    where: {
      userId,
      status,
      expiredAt: {
        gte: new Date(), // 未过期
      },
    },
    orderBy: {
      expiredAt: "asc",
    },
  });
}
