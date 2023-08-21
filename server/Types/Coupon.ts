import { PRODUCT_CATEGORY } from './Product';

const MINIMUM_BLOCK_SIZE = 10;
const POINT_TO_DISCOUNT_RATIO = 1;
export const MAX_POINT_DISCOUNT_PERCENTAGE = 20;

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
  id: number;
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

abstract class AbstractCoupon implements CouponInterface {
  id: number;
  campaign: CAMPAIGN;
  description: string;
  category: COUPON_CATEGORY;

  constructor(coupon: CouponInterface) {
    this.id = coupon.id ?? Math.floor(Math.random() * 1000000);
    this.campaign = coupon.campaign ?? CAMPAIGN.FIXED_AMOUNT;
    this.description = coupon.description ?? '';
    this.category = coupon.category ?? COUPON_CATEGORY.COUPON;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getCampaign(): CAMPAIGN {
    return this.campaign;
  }

  public setCampaign(campaign: CAMPAIGN): void {
    this.campaign = campaign;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: COUPON_CATEGORY): void {
    this.category = category;
  }
}

class FixedAmountCoupon extends AbstractCoupon implements FixedAmountCoupon {
  amount: number;

  constructor(coupon: FixedAmountCouponType) {
    super(coupon);
    this.amount = coupon.amount ?? 0;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }
}

class PercentageCoupon extends AbstractCoupon implements PercentageCouponType {
  percentage: number;

  constructor(coupon: PercentageCouponType) {
    super(coupon);
    this.percentage = coupon.percentage ?? 0;
  }

  public getPercentage(): number {
    return this.percentage;
  }

  public setPercentage(percentage: number): void {
    this.percentage = percentage;
  }
}

class PercentageWithCategoryCoupon
  extends PercentageCoupon
  implements PercentageWithCategoryCouponType
{
  productCategory: PRODUCT_CATEGORY;

  constructor(coupon: PercentageWithCategoryCouponType) {
    super(coupon);
    this.productCategory = coupon.productCategory ?? PRODUCT_CATEGORY.HOUSEHOLD;
  }

  public getProductCategory(): PRODUCT_CATEGORY {
    return this.productCategory;
  }

  public setProductCategory(productCategory: PRODUCT_CATEGORY): void {
    this.productCategory = productCategory;
  }
}

class PointDiscountCoupon
  extends AbstractCoupon
  implements PointDiscountCouponType
{
  pointsUsed: number;

  constructor(coupon: PointDiscountCouponType) {
    super(coupon);
    this.pointsUsed = coupon.pointsUsed ?? 0;
    this.description = `Points discount use ${this.pointsUsed} points to get ${
      this.pointsUsed * POINT_TO_DISCOUNT_RATIO
    } discount.`;
  }

  public getPointsUsed(): number {
    return this.pointsUsed;
  }

  public setPointsUsed(pointsUsed: number): void {
    this.pointsUsed = pointsUsed;
  }
}

class BlockCoupon extends AbstractCoupon implements BlockCouponType {
  block: number;
  amountPerBlock: number;

  constructor(coupon: BlockCouponType) {
    super(coupon);
    this.block = coupon.block ?? MINIMUM_BLOCK_SIZE;
    this.amountPerBlock = coupon.amountPerBlock ?? 0;
  }

  public getBlock(): number {
    return this.block;
  }

  public setBlock(block: number): void {
    this.block = block;
  }

  public getAmountPerBlock(): number {
    return this.amountPerBlock;
  }

  public setAmountPerBlock(discount: number): void {
    this.amountPerBlock = discount;
  }
}

type Coupon =
  | FixedAmountCoupon
  | PercentageCoupon
  | PercentageWithCategoryCoupon
  | PointDiscountCoupon
  | BlockCoupon;

export {
  FixedAmountCoupon,
  PercentageCoupon,
  PercentageWithCategoryCoupon,
  PointDiscountCoupon,
  BlockCoupon,
  Coupon,
};
