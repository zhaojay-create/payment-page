"use client";

import { useParams } from "next/navigation";
import { getOrCreateUserId } from "@/utils/uuid";
import { useEffect, useState } from "react";
import { Coupon } from "@/prisma/lib/generated/prisma";

const Page = () => {
  const { merchantId } = useParams();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("/api/coupon")
      .then((res) => res.json())
      .then((response) => {
        if (response.success !== false) {
          setCoupons(response.coupons || response.data || []);
        }
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("金额：", amount);
    console.log("使用的优惠券ID：", selectedCouponId);
    // 你可以在这里发起提交订单请求
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold">商户ID: {merchantId}</h1>
      <h1 className="text-xs font-bold mb-5">用户ID: {getOrCreateUserId()}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="输入你的金额"
          className="border border-gray-300 p-2 rounded w-full"
        />

        <div className="text-sm text-gray-700">选择优惠券：</div>
        <select
          value={selectedCouponId ?? ""}
          onChange={(e) => setSelectedCouponId(e.target.value || null)}
          className="border border-gray-300 p-2 rounded w-full bg-white text-sm"
        >
          <option value="">不使用优惠券</option>
          {coupons.map((coupon) => (
            <option key={coupon.id} value={coupon.id}>
              {coupon.title || "无标题"} - ¥{coupon.amount.toString()}（有效期至{" "}
              {coupon.expiredAt.toString()?.slice(0, 10)})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full"
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default Page;
