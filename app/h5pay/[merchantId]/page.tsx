"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Coupon } from "@/prisma/lib/generated/prisma";
import { getOrCreateUserId } from "@/utils/uuid";

const Page = () => {
  const { merchantId } = useParams(); // 获取商户ID todo: 需要校验商户ID是否合法
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const searchParams = useSearchParams();

  // 拼接参数
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    fetch("/api/coupon")
      .then((res) => res.json())
      .then((response) => {
        if (response.success !== false) {
          setCoupons(response.coupons || response.data || []);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交订单", amount, selectedCouponId);
    const response = await fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ merchantId, amount, couponId: selectedCouponId }),
    });
    const res = await response.json();
    console.log("res: ", res);

    if (res.success === true) {
      router.push(
        `/h5pay/success?${createQueryString("orderId", res.order.id)}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col items-center pt-8">
      <div className="w-full max-w-md">
        {/* 顶部信息 */}
        <div className="mb-4 px-6">
          <div className="text-center text-lg font-semibold text-gray-900 mb-1">
            付款
          </div>
          <div className="text-center text-xs text-gray-400 mb-2">
            商户ID: {merchantId}
          </div>
          <div className="text-center text-xs text-gray-400 mb-2">
            用户ID: {getOrCreateUserId()}
          </div>
        </div>

        {/* 金额输入 */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm px-6 py-6 space-y-6"
        >
          <div>
            <label className="block text-gray-700 text-sm mb-1">付款金额</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="请输入金额"
              className="w-full text-lg px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none bg-[#f7f8fa] transition"
              min={0}
            />
          </div>

          {/* 优惠券选择 */}
          <div>
            <div className="text-gray-700 text-sm mb-2">选择优惠券</div>
            <div className="space-y-3">
              <div
                className={`cursor-pointer rounded-xl border ${
                  selectedCouponId === null
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                } px-4 py-3 flex items-center`}
                onClick={() => setSelectedCouponId(null)}
              >
                <input
                  type="radio"
                  checked={selectedCouponId === null}
                  onChange={() => setSelectedCouponId(null)}
                  className="accent-blue-500 mr-3"
                />
                <span className="text-gray-700 text-sm">不使用优惠券</span>
              </div>
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`cursor-pointer rounded-xl border ${
                    selectedCouponId === coupon.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  } px-4 py-3 flex items-center justify-between transition`}
                  onClick={() => setSelectedCouponId(coupon.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedCouponId === coupon.id}
                      onChange={() => setSelectedCouponId(coupon.id)}
                      className="accent-blue-500 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {coupon.title || "优惠券"}
                      </div>
                      <div className="text-xs text-gray-400">
                        ¥{coupon.amount.toString()} · 有效期至{" "}
                        {coupon.expiredAt.toString().slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold">
                    {coupon.couponType}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-500 text-white text-base font-semibold shadow-sm hover:bg-blue-600 transition"
          >
            确认付款
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
