"use client";

import useCashbackCoupon from "@/store/useCashbackCoupon";

// http://localhost:3000/success?charset=utf-8&out_trade_no=e964d6a1-e890-491d-b025-e9eddb850a98&method=alipay.trade.wap.pay.return&total_amount=3.00&sign=W3atBxw4KqxOqShGYYcMjHJO2hoVhZtTcj%2FqyzxvjsjK1KLVHYYivOBHPKQpHYAakg%2FTG2%2B48PcMgqk2tGZTgdbEjB1IOUYW9im64PlrejSiu2PvA0Fx74l2NAdxqGdtt3a8b5pLeS7h1Vj89tDn1EQiq9lxfRv3Y%2BJQnjV%2By5zAtj8YVktNxn67hSpomid%2F2lQltlVthkwQu65G61zDqwXuELnu391uqmxCVsAF0hyXW3s5Huo8Vl8T3yDX1%2BRdlt78gq5%2F7rA5fIBYLLSyhNB4sb4jtXUXNKasFRBDujh4Kgt8Y0M6CTfmH0aeGH%2Fsa1k5Mr7cWYiw%2BeYU%2BowqkQ%3D%3D&trade_no=2025070622001461090506641854&auth_app_id=9021000150615348&version=1.0&app_id=9021000150615348&sign_type=RSA2&seller_id=2088721072410431&timestamp=2025-07-06+23%3A30%3A41

const Page = () => {
  const { cashbackCoupon } = useCashbackCoupon();
  const { title, description, amount, expiredAt } = cashbackCoupon || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f8fa] to-[#e9ebee] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">支付成功</h1>
        <p className="text-gray-500 mb-6">感谢您的支付！</p>

        {cashbackCoupon && (
          <div className="w-full bg-gradient-to-r from-[#f9fafc] to-[#f1f3f6] rounded-2xl p-5 mb-4 border border-[#e5e7eb] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-800">
                {title || "返利券"}
              </span>
              <span className="text-green-500 text-xl font-bold">
                ￥{Number(amount)}
              </span>
            </div>
            <div className="text-gray-400 text-sm mb-1">
              {description || "可在下次消费时使用"}
            </div>
            <div className="text-gray-400 text-xs">
              有效期至：
              {expiredAt ? new Date(expiredAt).toLocaleDateString() : "--"}
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-[#34c759] to-[#30b158] text-white text-lg font-semibold shadow-md active:scale-95 transition"
          onClick={() => (window.location.href = "/")}
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default Page;
