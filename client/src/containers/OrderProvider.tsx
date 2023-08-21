import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CouponType,
  OrderType,
  ProductType,
  CAMPAIGN,
  FixedAmountCouponType,
  PercentageCouponType,
  PercentageWithCategoryCouponType,
  PointDiscountCouponType,
  BlockCouponType,
  MAX_POINT_DISCOUNT_PERCENTAGE,
  POINT_TO_DISCOUNT_RATIO,
} from '../utils/types';

const initialOrder = {
  id: undefined,
  products: [],
  coupons: [],
  totalPrice: 0,
  netPrice: 0,
} as OrderType;

interface OrderContextType {
  order: OrderType;
  orderActions: {
    addProduct: (product: ProductType) => void;
    removeProduct: (product: ProductType) => void;
    addCoupon: (coupon: CouponType) => void;
    removeCoupon: (coupon: CouponType) => void;
  };
  orderData: {
    priceBeforeOnTop: number;
  };
}

const OrderContext = createContext<OrderContextType>({
  order: initialOrder,
  orderActions: {
    addProduct: () => {},
    removeProduct: () => {},
    addCoupon: () => {},
    removeCoupon: () => {},
  },
  orderData: {
    priceBeforeOnTop: 0,
  },
});

export const useOrderContext = (): OrderContextType => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState(initialOrder);
  let priceBeforeOnTop = order.totalPrice;

  const updateTotalPrice = (updatedPrice: number) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        totalPrice: updatedPrice,
        netPrice: updatedPrice,
      };
    });
  };

  const calculateNetPrice = () => {
    let currentPrice = order.totalPrice;
    let currentPriceBeforeOnTop = order.totalPrice;
    let currentPriceBeforeSeasonal = order.totalPrice;
    let netPrice = order.totalPrice;
    setOrder((prevOrder) => {
      let currentPrice = prevOrder.totalPrice;
      prevOrder.coupons.forEach((coupon) => {
        switch (coupon.campaign) {
          case CAMPAIGN.FIXED_AMOUNT:
            const fixedAmountCoupon = coupon as FixedAmountCouponType;
            currentPriceBeforeOnTop = currentPrice - fixedAmountCoupon.amount;
            currentPriceBeforeSeasonal = currentPriceBeforeOnTop;
            netPrice = currentPriceBeforeOnTop;
            break;
          case CAMPAIGN.PERCENTAGE:
            const percentageCoupon = coupon as PercentageCouponType;
            currentPriceBeforeOnTop =
              currentPrice - (currentPrice * percentageCoupon.percentage) / 100;
            currentPriceBeforeSeasonal = currentPriceBeforeOnTop;
            netPrice = currentPriceBeforeOnTop;
            break;
          case CAMPAIGN.PERCENTAGE_WITH_CATEGORY:
            const percentageWithCategoryCoupon =
              coupon as PercentageWithCategoryCouponType;
            let totalCategoryPrice = 0;
            prevOrder.products.forEach((product) => {
              if (
                product.category ===
                percentageWithCategoryCoupon.productCategory
              ) {
                totalCategoryPrice += product.price;
              }
            });
            currentPriceBeforeSeasonal =
              currentPriceBeforeOnTop -
              (totalCategoryPrice * percentageWithCategoryCoupon.percentage) /
                100;
            netPrice = currentPriceBeforeSeasonal;
            break;
          case CAMPAIGN.POINT_DISCOUNT:
            const pointDiscountCoupon = coupon as PointDiscountCouponType;
            const { discountedPrice } = validatePointUsed(
              currentPriceBeforeOnTop,
              pointDiscountCoupon.pointsUsed
            );
            currentPriceBeforeSeasonal =
              currentPriceBeforeOnTop - discountedPrice;
            netPrice = currentPriceBeforeSeasonal;
            break;
          case CAMPAIGN.BLOCK:
            const blockCoupon = coupon as BlockCouponType;
            const blockNumber = Math.floor(
              currentPriceBeforeSeasonal / blockCoupon.block
            );
            netPrice =
              currentPriceBeforeSeasonal -
              blockNumber * blockCoupon.amountPerBlock;
            break;
          default:
            throw new Error('Invalid coupon campaign type');
        }
      });
      priceBeforeOnTop = Math.max(
        Math.min(currentPriceBeforeOnTop, order.totalPrice),
        0
      );
      netPrice = Math.max(Math.min(netPrice, order.totalPrice), 0);
      return {
        ...prevOrder,
        netPrice,
      };
    });
  };

  const addProduct = (product: ProductType) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        products: [...prevOrder.products, product],
      };
    });
    updateTotalPrice(order.totalPrice + product.price);
  };

  const removeProduct = (product: ProductType) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        products: prevOrder.products.filter(
          (prevProduct) => prevProduct.id !== product.id
        ),
      };
    });
    updateTotalPrice(order.totalPrice - product.price);
  };

  const addCoupon = (coupon: CouponType) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        coupons: [...prevOrder.coupons, coupon],
      };
    });
    calculateNetPrice();
  };

  const removeCoupon = (coupon: CouponType) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        coupons: prevOrder.coupons.filter(
          (prevCoupon) => prevCoupon.id !== coupon.id
        ),
      };
    });
    calculateNetPrice();
  };

  const OrderRepository = {
    order,
    orderActions: {
      addProduct,
      removeProduct,
      addCoupon,
      removeCoupon,
    },
    orderData: {
      priceBeforeOnTop,
    },
  };

  return (
    <OrderContext.Provider value={OrderRepository}>
      {children}
    </OrderContext.Provider>
  );
};
