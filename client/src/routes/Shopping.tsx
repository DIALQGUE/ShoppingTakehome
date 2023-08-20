import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { StepFooter } from '../components/StepFooter';
import { SelectProducts, SelectCoupons, ConfirmOrder } from '../containers';

const steps = ['Pick Products', 'Pick Coupons', 'Confirm Order'];

export const Shopping = () => {
  const [activeStep, setActiveStep] = React.useState(0);

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
      {activeStep === 0 && <SelectProducts />}
      {activeStep === 1 && <SelectCoupons />}
      {activeStep === 2 && <ConfirmOrder />}
      <StepFooter
        stepsLength={steps.length}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Box>
  );
};
