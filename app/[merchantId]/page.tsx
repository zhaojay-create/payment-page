"use client";

import { useParams } from "next/navigation";
import { getOrCreateUserId } from "@/utils/uuid";

const Page = ({}) => {
  // 这里可以添加一些逻辑，比如获取商户ID等
  const { merchantId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold">商户ID: {merchantId}</h1>
      <h1 className="text-xs font-bold mb-5">用户ID: {getOrCreateUserId()}</h1>
      <form action="" className="bg-white p-6 rounded shadow-md w-96">
        <input
          type="number"
          placeholder="输入你的金额"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <div className="mt-4 flex flex-col space-y-2 text-gray-700">
          <div className="flex items-center space-x-2">
            <input type="radio" id="coupon1" name="coupon" value="coupon1" />
            <label htmlFor="coupon1">优惠券1</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="coupon2" name="coupon" value="coupon2" />
            <label htmlFor="coupon2">优惠券2</label>
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full"
          type="submit"
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default Page;
