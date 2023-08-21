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
}

const OrderContext = createContext<OrderContextType>({
  order: initialOrder,
  orderActions: {
    addProduct: () => {},
    removeProduct: () => {},
    addCoupon: () => {},
    removeCoupon: () => {},
  },
});

export const useOrderContext = (): OrderContextType => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState(initialOrder);

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
    setOrder((prevOrder) => {
      let currentPrice = prevOrder.totalPrice;
      prevOrder.coupons.forEach((coupon) => {
        switch (coupon.campaign) {
          case CAMPAIGN.FIXED_AMOUNT:
            const fixedAmountCoupon = coupon as FixedAmountCouponType;
            currentPrice = currentPrice - fixedAmountCoupon.amount;
            break;
          case CAMPAIGN.PERCENTAGE:
            const percentageCoupon = coupon as PercentageCouponType;
            currentPrice =
              currentPrice - (currentPrice * percentageCoupon.percentage) / 100;
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
            currentPrice =
              currentPrice -
              (totalCategoryPrice * percentageWithCategoryCoupon.percentage) /
                100;
            break;
          case CAMPAIGN.POINT_DISCOUNT:
            const pointDiscountCoupon = coupon as PointDiscountCouponType;
            currentPrice = currentPrice - pointDiscountCoupon.pointsUsed;
            break;
          case CAMPAIGN.BLOCK:
            const blockCoupon = coupon as BlockCouponType;
            const blockNumber = Math.floor(currentPrice / blockCoupon.block);
            currentPrice =
              currentPrice - blockNumber * blockCoupon.amountPerBlock;
            break;
          default:
            throw new Error('Invalid coupon campaign type');
        }
      });
      return {
        ...prevOrder,
        netPrice: currentPrice,
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
  };

  return (
    <OrderContext.Provider value={OrderRepository}>
      {children}
    </OrderContext.Provider>
  );
};
