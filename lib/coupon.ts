// 处理券的逻辑
import { prisma } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  if (typeof uid !== "string") {
    return res.status(400).json({ error: "Missing or invalid uid" });
  }

  const coupons = await prisma.coupon.findMany({
    where: {
      userId: uid,
      status: "unused",
      expiredAt: {
        gte: new Date(),
      },
    },
  });

  res.status(200).json({ coupons });
}
