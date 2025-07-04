import {
  PrismaClient,
  CouponStatus,
  CouponType,
  OrderStatus,
} from "./lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 创建商家
  // const merchant1 = await prisma.merchant.create({
  //   data: {
  //     name: "商家A",
  //     logo: "",
  //     description: "描述A",
  //     address: "地址A",
  //     phone: "13800000001",
  //     email: "a@merchant.com",
  //     password: "passwordA",
  //   },
  // });
  // const merchant2 = await prisma.merchant.create({
  //   data: {
  //     name: "商家B",
  //     logo: "",
  //     description: "描述B",
  //     address: "地址B",
  //     phone: "13800000002",
  //     email: "b@merchant.com",
  //     password: "passwordB",
  //   },
  // });
  // 创建用户
  // const user1 = await prisma.user.create({
  //   data: {
  //     name: "用户1",
  //     email: "user1@test.com",
  //     phone: "13900000001",
  //     password: "user1pass",
  //   },
  // });
  // const user2 = await prisma.user.create({
  //   data: {
  //     name: "用户2",
  //     email: "user2@test.com",
  //     phone: "13900000002",
  //     password: "user2pass",
  //   },
  // });

  // 创建优惠券
  // const coupon1 = await prisma.coupon.create({
  //   data: {
  //     userId: user1.id,
  //     fromMerchantId: merchant1.id,
  //     amount: 10.0,
  //     status: CouponStatus.unused,
  //     couponType: CouponType.discount,
  //     title: "10元折扣券",
  //     description: "满100减10",
  //     expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30天后过期
  //     issuedAt: new Date(),
  //   },
  // });
  // const coupon2 = await prisma.coupon.create({
  //   data: {
  //     userId: user2.id,
  //     fromMerchantId: merchant2.id,
  //     amount: 20.0,
  //     status: CouponStatus.unused,
  //     couponType: CouponType.cashback,
  //     title: "20元现金券",
  //     description: "无门槛",
  //     expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15天后过期
  //     issuedAt: new Date(),
  //   },
  // });

  // // 创建订单
  // await prisma.order.create({
  //   data: {
  //     userId: user1.id,
  //     merchantId: merchant1.id,
  //     amount: 90.0,
  //     originalAmount: 100.0,
  //     couponId: coupon1.id,
  //     status: OrderStatus.completed,
  //   },
  // });
  // await prisma.order.create({
  //   data: {
  //     userId: user2.id,
  //     merchantId: merchant2.id,
  //     amount: 80.0,
  //     originalAmount: 100.0,
  //     couponId: coupon2.id,
  //     status: OrderStatus.pending,
  //   },
  // });

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
