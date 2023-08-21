import {
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import {
  CAMPAIGN,
  COUPON_CATEGORY,
  POINT_DISCOUNT_COUPON_DESCRIPTION,
  CouponType,
  PointDiscountCouponType,
} from 'src/utils/types';
import { Coupon } from '../components';

const couponCategories = Object.values(COUPON_CATEGORY);

const couponCategoriesForDisplay = {
  [COUPON_CATEGORY.COUPON]: 'Coupon',
  [COUPON_CATEGORY.ONTOP]: 'Coupon On Top',
  [COUPON_CATEGORY.SEASONAL]: 'Seasonal Coupon',
};

const pointCoupon = {
  id: undefined,
  campaign: CAMPAIGN.POINT_DISCOUNT,
  category: COUPON_CATEGORY.ONTOP,
  description: POINT_DISCOUNT_COUPON_DESCRIPTION,
  pointsUsed: 0,
} as PointDiscountCouponType;
type SelectCouponsProps = {
  coupons: CouponType[];
};

export const SelectCoupons = (props: SelectCouponsProps) => {
  const { coupons } = props;

  return (
    <FormGroup>
      {couponCategories.map((couponCategory) => (
        <Accordion defaultExpanded={couponCategory === COUPON_CATEGORY.COUPON}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant={'h3'}
              children={couponCategoriesForDisplay[couponCategory]}
            />
          </AccordionSummary>
          <AccordionDetails>
            {coupons?.map(
              (coupon) =>
                coupon.category === couponCategory && <Coupon coupon={coupon} />
            )}
            {couponCategory === COUPON_CATEGORY.ONTOP && (
              <Coupon coupon={pointCoupon} />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </FormGroup>
  );
};
