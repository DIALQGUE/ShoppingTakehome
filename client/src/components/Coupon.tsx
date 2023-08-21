import React, { ChangeEvent } from 'react';
import { Box, Checkbox, Typography, Input } from '@mui/material';
import { useOrderContext } from '../containers';
import {
  CAMPAIGN,
  CouponType,
  PointDiscountCouponType,
  ValidatePointUsedReturnType,
} from 'src/utils/types';

type CouponProps = {
  coupon: CouponType;
};

const MAX_USER_POINT = 999;

export const Coupon = (props: CouponProps) => {
  const [pointsUsed, setPointsUsed] = React.useState(0);
  const [validatPointUsedReturn, setValidatPointUsedReturn] = React.useState({
    isPointQuotaReached: false,
    discountedPrice: 0,
  } as ValidatePointUsedReturnType);
  const { order, orderActions, orderData } = useOrderContext();
  const { coupons } = order;
  const { priceBeforeOnTop } = orderData;
  const { coupon } = props;
  const { description } = coupon;
  const selectedCouponWithSameCategory = coupons.filter(
    (selectedCoupon) => selectedCoupon.category === coupon.category
  )?.[0];

  const handlePointsUsedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cappedPoint = Math.max(
      Math.min(Number(event.target.value), MAX_USER_POINT),
      0
    );
    setPointsUsed(cappedPoint);
    const validatePointUsedreturn = orderActions.validatePointUsed(
      priceBeforeOnTop,
      cappedPoint
    );
    setValidatPointUsedReturn(validatePointUsedreturn);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (coupon.campaign === CAMPAIGN.POINT_DISCOUNT) {
      const pointDiscountCoupon = coupon as PointDiscountCouponType;
      pointDiscountCoupon.pointsUsed = pointsUsed;
    }
    checked
      ? orderActions.addCoupon(coupon)
      : orderActions.removeCoupon(coupon);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 3,
        padding: 2,
        borderBottom: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography children={description} />
        <Checkbox
          onChange={handleChange}
          disabled={
            selectedCouponWithSameCategory &&
            coupon !== selectedCouponWithSameCategory
          }
        />
      </Box>
      {coupon.campaign === CAMPAIGN.POINT_DISCOUNT && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant={'caption'}
            children={`You must reselect this coupon after you change the points used`}
          />
          <Input
            type={'number'}
            value={pointsUsed}
            onChange={handlePointsUsedChange}
          />
          {validatPointUsedReturn.isPointQuotaReached && (
            <Typography
              variant={'caption'}
              sx={{ color: 'red' }}
              children={`You use points more than max points using quota, you will only discounted for ${validatPointUsedReturn.discountedPrice} baht`}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
