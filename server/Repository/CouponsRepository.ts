import { readFileSync } from 'fs';

import {
  CAMPAIGN,
  Coupon,
  FixedAmountCoupon,
  PercentageCoupon,
  PercentageWithCategoryCoupon,
  PointDiscountCoupon,
  BlockCoupon,
  CouponType,
  FixedAmountCouponType,
  PercentageCouponType,
  PercentageWithCategoryCouponType,
  PointDiscountCouponType,
  BlockCouponType,
} from '@Types';

export class CouponRepositiory {
  coupons: Coupon[] = [];
  constructor() {
    let rawCoupons = JSON.parse(readFileSync('./mock/coupons.json', 'utf8'));
    rawCoupons.forEach((rawCoupon: CouponType) => {
      switch (rawCoupon.campaign) {
        case CAMPAIGN.FIXED_AMOUNT:
          const rawFixedAmountCoupon = rawCoupon as FixedAmountCouponType;
          this.coupons.push(new FixedAmountCoupon(rawFixedAmountCoupon));
          break;
        case CAMPAIGN.PERCENTAGE:
          const rawPercentageCoupon = rawCoupon as PercentageCouponType;
          this.coupons.push(new PercentageCoupon(rawPercentageCoupon));
          break;
        case CAMPAIGN.PERCENTAGE_WITH_CATEGORY:
          const rawPercentageWithCategoryCoupon =
            rawCoupon as PercentageWithCategoryCouponType;
          this.coupons.push(
            new PercentageWithCategoryCoupon(rawPercentageWithCategoryCoupon)
          );
          break;
        case CAMPAIGN.POINT_DISCOUNT:
          const rawPointDiscountCoupon = rawCoupon as PointDiscountCouponType;
          this.coupons.push(new PointDiscountCoupon(rawPointDiscountCoupon));
          break;
        case CAMPAIGN.BLOCK:
          const rawBlockCoupon = rawCoupon as BlockCouponType;
          this.coupons.push(new BlockCoupon(rawBlockCoupon));
          break;
        default:
          throw new Error('Invalid campaign type');
      }
    });
    console.log('Coupons loaded from file successfully 🎫');
  }

  public getCoupons() {
    return this.coupons;
  }

  public getCouponsByIds(ids: number[]) {
    return this.coupons.filter((coupon) => ids.includes(coupon.id));
  }

  public getCouponById(id: number) {
    return this.coupons.find((coupon) => coupon.id === id);
  }
}
