import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { StepFooter } from '../components/StepFooter';
import {
  SelectProducts,
  SelectCoupons,
  ConfirmOrder,
  useOrderContext,
} from '../containers';

const steps = ['Pick Products', 'Pick Coupons', 'Confirm Order'];

export const Shopping = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { order, orderActions } = useOrderContext();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
      >
      {activeStep === 0 && <SelectProducts />}
      {activeStep === 1 && <SelectCoupons />}
      {activeStep === 2 && <ConfirmOrder />}
      </Box>
      <Box
      >
        <Box
        >
          <Typography children={`Total Price: ${order.totalPrice} Baht`} />
          {activeStep === 1 && (
            <Typography children={`Net Price: ${order.netPrice} Baht`} />
          )}
        </Box>
      <StepFooter
        stepsLength={steps.length}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Box>
    </Box>
  );
};
