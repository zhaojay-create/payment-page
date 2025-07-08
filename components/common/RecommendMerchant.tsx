import prisma from "@/lib/prisma";
import Link from "next/link";
import React, { FC } from "react";

const RecommendMerchant: FC = async () => {
  // 1. 查询推荐商户
  // todo: 之后引入商圈的概念
  const merchants = (await prisma.merchant.findMany()).slice(0, 3);

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">推荐商户</span>
        <Link href="/merchants" className="text-blue-500 text-sm">
          查看全部
        </Link>
      </div>
      <div className="space-y-3">
        {merchants.map((item, idx) => (
          <Link
            href={`/pay/${item.id}}`}
            key={item.id}
            className="flex items-center space-x-3 bg-[#f9fafb] p-3 rounded-lg hover:bg-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-gray-300" />
            <div className="flex-1">
              <div className="font-medium text-gray-800">商户{idx}</div>
              <div className="text-xs text-gray-400">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendMerchant;
