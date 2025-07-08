import HelloHeader from "@/components/common/HelloHeader";
import RecentCoupons from "@/components/common/RecentCoupons";
import RecommendMerchant from "@/components/common/RecommendMerchant";
import FooterNavLink from "@/components/common/FooterNavLink";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 space-y-6">
      {/* 顶部欢迎 */}
      <HelloHeader />

      {/* 最近优惠券 */}
      <RecentCoupons />

      {/* 推荐商户 */}
      <RecommendMerchant />

      {/* 底部导航（选配） */}
      <FooterNavLink />
    </div>
  );
};

export default Page;
