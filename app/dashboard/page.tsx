import Link from "next/link";
import HelloHeader from "@/components/common/HelloHeader";
import RecentCoupons from "@/components/common/RecentCoupons";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 space-y-6">
      {/* 顶部欢迎 */}
      <HelloHeader />

      {/* 最近优惠券 */}
      <RecentCoupons />

      {/* 推荐商户 */}
      <div className="bg-white rounded-xl p-4 shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">推荐商户</span>
          <Link href="/merchants" className="text-blue-500 text-sm">
            查看全部
          </Link>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Link
              href={`/pay/merchant${i}`}
              key={i}
              className="flex items-center space-x-3 bg-[#f9fafb] p-3 rounded-lg hover:bg-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-gray-300" />
              <div className="flex-1">
                <div className="font-medium text-gray-800">商户{i}</div>
                <div className="text-xs text-gray-400">
                  人气火锅店 · 距离500m
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 底部导航（选配） */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center shadow">
        <Link href="/" className="text-blue-500 font-semibold">
          首页
        </Link>
        <Link href="/profile" className="text-gray-500">
          我的
        </Link>
        <Link href="/scan" className="text-gray-500">
          扫码
        </Link>
      </div>
    </div>
  );
};

export default Page;
