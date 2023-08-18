import fs from 'fs';

import {
  CAMPAIGN,
  Coupon,
  FixedAmountCoupon,
  PercentageCoupon,
  PercentageWithCategoryCoupon,
  PointDiscountCoupon,
  BlockCoupon
} from '../Types';

export class CouponRepositiory {
  coupons: Coupon[];
  constructor() {
    let rawCoupons = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
    rawCoupons.forEach((coupon) => {
      switch (coupon.campaign) {
        case CAMPAIGN.FIXED_AMOUNT:
          this.coupons.push(new FixedAmountCoupon(coupon));
          break;
        case CAMPAIGN.PERCENTAGE:
          this.coupons.push(new PercentageCoupon(coupon));
          break;
        case CAMPAIGN.PERCENTAGE_WITH_CATEGORY:
          this.coupons.push(new PercentageWithCategoryCoupon(coupon));
          break;
        case CAMPAIGN.POINT_DISCOUNT:
          this.coupons.push(new PointDiscountCoupon(coupon));
          break;
        case CAMPAIGN.BLOCK:
          this.coupons.push(new BlockCoupon(coupon));
          break;
      }
    });
  }

  getCoupons() {
    return this.coupons;
  }

  getCouponById(id: number) {
    return this.coupons.find((coupon) => coupon.id === id);
  }
}
