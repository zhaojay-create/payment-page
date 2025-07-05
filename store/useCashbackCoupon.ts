import { Coupon } from "@/prisma/lib/generated/prisma";
import { create } from "zustand";

type CouponState = {
  cashbackCoupon: Coupon | null;
  setCashbackCoupon: (coupon: Coupon) => void;
};

const useCashbackCoupon = create<CouponState>((set) => ({
  cashbackCoupon: null,
  setCashbackCoupon: (coupon) => set({ cashbackCoupon: coupon }),
}));

export default useCashbackCoupon;
