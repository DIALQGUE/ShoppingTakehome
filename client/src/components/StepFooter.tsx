import { Box, Button } from '@mui/material';

type StepFooterProps = {
  stepsLength: number;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
};

export const StepFooter = (props: StepFooterProps) => {
  const { stepsLength, activeStep, handleNext, handleBack } = props;
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === stepsLength - 1} onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
};
