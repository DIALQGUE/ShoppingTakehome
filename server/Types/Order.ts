import { Product } from './Product';
import {
  CAMPAIGN,
  MAX_POINT_DISCOUNT_PERCENTAGE,
  Coupon,
  FixedAmountCoupon,
  PercentageCoupon,
  PercentageWithCategoryCoupon,
  PointDiscountCoupon,
  BlockCoupon,
} from './Coupon';

export type OrderType = {
  id: number | undefined;
  products: Product[];
  coupons: Coupon[];
  totalPrice: number | undefined;
  netPrice: number | undefined;
};

export class Order implements OrderType {
  id!: number;
  products!: Product[];
  coupons!: Coupon[];
  totalPrice!: number;
  netPrice!: number;

  constructor(order: OrderType) {
    this.id = order.id ?? Math.floor(Math.random() * 1000000);
    this.products = order.products ?? [];
    this.coupons = order.coupons ?? [];
    this.totalPrice = this.calculateTotalPrice();
    if (order.netPrice) {
      this.netPrice = order.netPrice;
    } else {
      this.applyCoupons();
    }
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public setProducts(products: Product[]): void {
    this.products = products;
  }

  public addProduct(product: Product): void {
    this.products.push(product);
  }

  public getCoupons(): any {
    return this.coupons;
  }

  public setCoupons(coupons: any): void {
    this.coupons = coupons;
  }

  public addCoupon(coupon: Coupon): void {
    this.coupons.push(coupon);
  }

  public getTotalPrice(): number {
    return this.totalPrice;
  }

  public getNetPrice(): number {
    return this.netPrice;
  }

  private setNetPrice(netPrice: number): void {
    this.netPrice = netPrice;
  }

  private calculateTotalPrice(): number {
    let totalPrice = 0;
    this.products.forEach((product) => {
      totalPrice += product.getPrice();
    });
    return totalPrice;
  }

  public applyCoupons(): void {
    let currentPrice = this.getTotalPrice();
    this.coupons.forEach((coupon) => {
      currentPrice = this.applyCoupon(coupon, currentPrice);
    });
    this.setNetPrice(currentPrice);
  }

  public applyCoupon(coupon: Coupon, currentPrice: number): number {
    switch (coupon.getCampaign()) {
      case CAMPAIGN.FIXED_AMOUNT:
        const fixedAmountCoupon = coupon as FixedAmountCoupon;
        currentPrice = currentPrice - fixedAmountCoupon.getAmount();
        break;
      case CAMPAIGN.PERCENTAGE:
        const percentageCoupon = coupon as PercentageCoupon;
        currentPrice =
          currentPrice -
          (currentPrice * percentageCoupon.getPercentage()) / 100;
        break;
      case CAMPAIGN.PERCENTAGE_WITH_CATEGORY:
        const percentageWithCategoryCoupon =
          coupon as PercentageWithCategoryCoupon;
        let totalCategoryPrice = 0;
        this.products.forEach((product) => {
          if (
            product.getCategory() === percentageWithCategoryCoupon.getCategory()
          ) {
            totalCategoryPrice += product.getPrice();
          }
        });
        currentPrice =
          currentPrice -
          (totalCategoryPrice * percentageWithCategoryCoupon.getPercentage()) /
            100;
        break;
      case CAMPAIGN.POINT_DISCOUNT:
        const pointDiscountCoupon = coupon as PointDiscountCoupon;
        currentPrice =
          currentPrice -
          Math.min(
            pointDiscountCoupon.getPointsUsed(),
            (currentPrice * MAX_POINT_DISCOUNT_PERCENTAGE) / 100
          );
        break;
      case CAMPAIGN.BLOCK:
        const blockCoupon = coupon as BlockCoupon;
        const blockNumber = Math.floor(currentPrice / blockCoupon.getBlock());
        currentPrice =
          currentPrice - blockNumber * blockCoupon.getAmountPerBlock();
        break;
      default:
        throw new Error('Invalid coupon campaign type');
    }
    return currentPrice;
  }
}
