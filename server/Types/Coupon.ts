export enum CAMPAIGN {
    FIXED_AMOUNT = 'fixedAmount',
    PERCENTAGE = 'percentage',
    PERCENTAGE_WITH_CATEGORY = 'percentageWithCategory',
    POINT_DISCOUNT = 'pointDiscount',
    BLOCK = 'block'
}

export const MAX_POINT_DISCOUNT_PERCENTAGE = 20;

interface CouponInterface {
    id: number;
    campaign: CAMPAIGN;
    description: string;
    category: string;
}

type FixedAmountCouponType = CouponInterface & {
    amount: number;
};

type PercentageCouponType = CouponInterface & {
    percentage: number;
};

type PercentageWithCategoryCouponType = PercentageCouponType & {
    category: string;
};

type PointDiscountCouponType = CouponInterface & {
    pointsUsed: number;
};

type BlockCouponType = CouponInterface & {
    block: number;
    discountPerBlock: number;
};

type CouponType = FixedAmountCouponType | PercentageCouponType | PercentageWithCategoryCouponType | PointDiscountCouponType | BlockCouponType;

export type { FixedAmountCouponType, PercentageCouponType, PercentageWithCategoryCouponType, PointDiscountCouponType, BlockCouponType, CouponType };

abstract class AbstractCoupon implements CouponInterface {
    id: number;
    campaign: CAMPAIGN;
    description: string;
    category: string;

    constructor(coupon: CouponInterface) {
        this.id = coupon.id;
        this.campaign = coupon.campaign;
        this.description = coupon.description;
        this.category = coupon.category;
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

    public setCategory(category: string): void {
        this.category = category;
    }
}

class FixedAmountCoupon extends AbstractCoupon implements FixedAmountCoupon{
    amount: number;

    constructor(coupon: FixedAmountCouponType) {
        super(coupon);
        this.amount = coupon.amount;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }
}

class PercentageCoupon extends AbstractCoupon implements PercentageCouponType{
    percentage: number;

    constructor(coupon: PercentageCouponType) {
        super(coupon);
        this.percentage = coupon.percentage;
    }

    public getPercentage(): number {
        return this.percentage;
    }

    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }
}

class PercentageWithCategoryCoupon extends PercentageCoupon implements PercentageWithCategoryCouponType{
    category: string;

    constructor(coupon: PercentageWithCategoryCouponType) {
        super(coupon);
        this.category = coupon.category;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }
}

class PointDiscountCoupon extends AbstractCoupon implements PointDiscountCouponType{
    pointsUsed: number;

    constructor(coupon: PointDiscountCouponType) {
        super(coupon);
        this.pointsUsed = coupon.pointsUsed;
    }

    public getPointsUsed(): number {
        return this.pointsUsed;
    }

    public setPointsUsed(pointsUsed: number): void {
        this.pointsUsed = pointsUsed;
    }
}

class BlockCoupon extends AbstractCoupon implements BlockCouponType{
    block: number;
    discountPerBlock: number;

    constructor(coupon: BlockCouponType) {
        super(coupon);
        this.block = coupon.block;
        this.discountPerBlock = coupon.discountPerBlock;
    }

    public getBlock(): number {
        return this.block;
    }

    public setBlock(block: number): void {
        this.block = block;
    }

    public getDiscountPerBlock(): number {
        return this.discountPerBlock;
    }

    public setDiscountPerBlock(discount: number): void {
        this.discountPerBlock = discount;
    }
}

type Coupon = FixedAmountCoupon | PercentageCoupon | PercentageWithCategoryCoupon | PointDiscountCoupon | BlockCoupon;

export { FixedAmountCoupon, PercentageCoupon, PercentageWithCategoryCoupon, PointDiscountCoupon, BlockCoupon, Coupon };
