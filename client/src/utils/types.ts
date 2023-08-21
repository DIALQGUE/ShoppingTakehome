export const POINT_TO_DISCOUNT_RATIO = 1;
export const MAX_POINT_DISCOUNT_PERCENTAGE = 20;
export const POINT_DISCOUNT_COUPON_DESCRIPTION = `Use points to get discount. Every 1 point equals ${POINT_TO_DISCOUNT_RATIO} baht discount, up to ${MAX_POINT_DISCOUNT_PERCENTAGE}% of total price before on top discount.`;

export enum PRODUCT_CATEGORY {
  FASHION = 'Fashion',
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  HOUSEHOLD = 'Household',
}

export enum COUPON_CATEGORY {
  COUPON = 'coupon',
  ONTOP = 'onTop',
  SEASONAL = 'seasonal',
}

export enum CAMPAIGN {
  FIXED_AMOUNT = 'fixedAmount',
  PERCENTAGE = 'percentage',
  PERCENTAGE_WITH_CATEGORY = 'percentageWithCategory',
  POINT_DISCOUNT = 'pointDiscount',
  BLOCK = 'block',
}

interface CouponInterface {
  id: number | undefined;
  campaign: CAMPAIGN;
  description: string;
  category: COUPON_CATEGORY;
}

type FixedAmountCouponType = CouponInterface & {
  amount: number;
};

type PercentageCouponType = CouponInterface & {
  percentage: number;
};

type PercentageWithCategoryCouponType = PercentageCouponType & {
  productCategory: PRODUCT_CATEGORY;
};

type PointDiscountCouponType = CouponInterface & {
  pointsUsed: number;
};

type BlockCouponType = CouponInterface & {
  block: number;
  amountPerBlock: number;
};

type CouponType =
  | FixedAmountCouponType
  | PercentageCouponType
  | PercentageWithCategoryCouponType
  | PointDiscountCouponType
  | BlockCouponType;

export type {
  FixedAmountCouponType,
  PercentageCouponType,
  PercentageWithCategoryCouponType,
  PointDiscountCouponType,
  BlockCouponType,
  CouponType,
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: PRODUCT_CATEGORY;
};

export type OrderType = {
  id: number | undefined;
  products: ProductType[];
  coupons: CouponType[];
  totalPrice: number;
  netPrice: number;
};

export type ValidatePointUsedReturnType = {
  isPointQuotaReached: boolean;
  discountedPrice: number;
};
