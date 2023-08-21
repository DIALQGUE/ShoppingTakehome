import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { StepFooter } from '../components';
import {
  SelectProducts,
  SelectCoupons,
  ConfirmOrder,
  useOrderContext,
} from '../containers';
import { ProductType, CouponType } from '../utils/types';

const steps = ['Pick Products', 'Pick Coupons', 'Confirm Order'];

export const Shopping = () => {
  const { order } = useOrderContext();
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((res) => {
      const fetchedProducts = res.data;
      setProducts(fetchedProducts);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/coupons').then((res) => {
      const fetchedCoupons = res.data;
      setCoupons(fetchedCoupons);
    });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = () => {
  };

  return (
    <Box sx={{ width: '100%', marginTop: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          mb: 15,
        }}
      >
        {activeStep === 0 && <SelectProducts products={products} />}
        {activeStep === 1 && <SelectCoupons coupons={coupons} />}
        {activeStep === 2 && <ConfirmOrder />}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 1,
          'background-color': 'lightgray',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ width: 200 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography children={'Total Price:'} />
              <Typography children={`${order.totalPrice} baht`} />
            </Box>
            {activeStep > 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography children={'Discount:'} />
                  <Typography
                    children={`${order.netPrice - order.totalPrice} baht`}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography children={'Net Price:'} />
                  <Typography children={`${order.netPrice} baht`} />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <StepFooter
          stepsLength={steps.length}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleConfirm={handleConfirm}
        />
      </Box>
    </Box>
  );
};
