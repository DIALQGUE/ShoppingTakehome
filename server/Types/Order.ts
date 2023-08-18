import { Product } from './Product';
import {
    CAMPAIGN,
    MAX_POINT_DISCOUNT_PERCENTAGE,
    Coupon,
    FixedAmountCoupon,
    PercentageCoupon,
    PercentageWithCategoryCoupon,
    PointDiscountCoupon,
    BlockCoupon
} from './Coupon';

export type OrderType = {
    id: number;
    products: Product[];
    coupons: Coupon[];
    totalPrice: number;
    netPrice: number;
};

export class Order implements OrderType{
    id: number;
    products: Product[];
    coupons: Coupon[];
    totalPrice: number;
    netPrice: number;

    constructor(order: OrderType){
        this.id = order.id;
        this.products = order.products;
        this.coupons = order.coupons;
        this.totalPrice = this.calculateTotalPrice();
        this.netPrice = this.totalPrice;
    }

    public getId(): number{
        return this.id;
    }

    public setId(id: number): void{
        this.id = id;
    }

    public getProducts(): Product[]{
        return this.products;
    }

    public setProducts(products: Product[]): void{
        this.products = products;
    }

    public addProduct(product: Product): void{
        this.products.push(product);
    }

    public getCoupons(): any{
        return this.coupons;
    }

    public setCoupons(coupons: any): void{
        this.coupons = coupons;
    }

    public addCoupon(coupon: Coupon): void{
        this.coupons.push(coupon);
    }

    public getTotalPrice(): number{
        return this.totalPrice;
    }

    private setTotalPrice(totalPrice: number): void{
        this.totalPrice = totalPrice;
    }

    public getNetPrice(): number{
        return this.netPrice;
    }

    private setNetPrice(netPrice: number): void{
        this.netPrice = netPrice;
    }

    private calculateTotalPrice(): number{
        let totalPrice = 0;
        this.products.forEach(product => {
            totalPrice += product.getPrice();
        });
        return totalPrice;
    }

    public applyCoupons(): void{
        this.coupons.forEach(coupon => {
            this.applyCoupon(coupon);
        });
    }

    public applyCoupon(coupon: Coupon): void{
        let discountedPrice = this.getNetPrice();
        switch(coupon.getCampaign()){
            case CAMPAIGN.FIXED_AMOUNT:
                const fixedAmountCoupon = coupon as FixedAmountCoupon;
                discountedPrice = discountedPrice - fixedAmountCoupon.getAmount();
                break;
            case CAMPAIGN.PERCENTAGE:
                const percentageCoupon = coupon as PercentageCoupon;
                discountedPrice = discountedPrice - (discountedPrice * percentageCoupon.getPercentage() / 100);
                break;
            case CAMPAIGN.PERCENTAGE_WITH_CATEGORY:
                const percentageWithCategoryCoupon = coupon as PercentageWithCategoryCoupon;
                let totalCategoryPrice = 0;
                this.products.forEach(product => {
                    if(product.getCategory() === percentageWithCategoryCoupon.getCategory()){
                        totalCategoryPrice += product.getPrice();
                    }
                });
                discountedPrice = discountedPrice - (totalCategoryPrice * percentageWithCategoryCoupon.getPercentage() / 100);
                break;
            case CAMPAIGN.POINT_DISCOUNT:
                const pointDiscountCoupon = coupon as PointDiscountCoupon;
                discountedPrice = discountedPrice - Math.min(pointDiscountCoupon.getPointsUsed(), discountedPrice * MAX_POINT_DISCOUNT_PERCENTAGE / 100);
                break;
            case CAMPAIGN.BLOCK:
                const blockCoupon = coupon as BlockCoupon;
                const blockNumber = Math.floor(discountedPrice / blockCoupon.getBlock());
                discountedPrice = discountedPrice - (blockNumber * blockCoupon.getDiscountPerBlock());
                break;
            default:
                throw new Error('Invalid coupon campaign type');
        }
        this.setNetPrice(discountedPrice);
    }

}