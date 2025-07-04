import {
  PrismaClient,
  CouponStatus,
  CouponType,
  OrderStatus,
} from "./lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 创建商家
  const merchant1 = await prisma.merchant.create({
    data: {
      name: "平台",
      email: "platform@test.com",
      phone: "13800009991",
      password: "123456",
    },
  });
  await prisma.merchant.createMany({
    data: [
      {
        name: "火锅店",
        email: "hotPot@test.com",
        phone: "13800000001",
        password: "123456",
      },
      {
        name: "按摩",
        email: "anmo@test.com",
        phone: "13800000002",
        password: "123456",
      },
      {
        name: "理发",
        email: "haird@test.com",
        phone: "13800000003",
        password: "123456",
      },
    ],
  });
  // 创建用户
  const user = await prisma.user.create({
    data: {
      name: "用户1",
      email: "user1@test.com",
      phone: "17735919191",
      password: "123456",
    },
  });

  // 创建优惠券
  const coupon = await prisma.coupon.create({
    data: {
      userId: user.id,
      fromMerchantId: merchant1.id,
      amount: 10.0,
      status: CouponStatus.unused,
      couponType: CouponType.discount,
      title: "10元折扣券",
      description: "满100减10",
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30天后过期
      issuedAt: new Date(),
    },
  });

  // 创建订单
  await prisma.order.create({
    data: {
      userId: user.id,
      merchantId: merchant1.id,
      amount: 90.0,
      originalAmount: 100.0,
      couponId: coupon.id,
      status: OrderStatus.completed,
    },
  });

  console.log("🌱 Mock 数据已插入");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🌱 断开 Prisma 连接, mock 数据生成!");
    await prisma.$disconnect();
  });
