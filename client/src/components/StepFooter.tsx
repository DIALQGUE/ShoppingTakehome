import { Box, Button } from '@mui/material';

type StepFooterProps = {
  stepsLength: number;
  activeStep: number;
  handleNext: () => void;
  handleConfirm: () => void;
  handleBack: () => void;
};

export const StepFooter = (props: StepFooterProps) => {
  const { stepsLength, activeStep, handleNext, handleBack, handleConfirm } =
    props;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep < stepsLength - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleConfirm}>Confirm</Button>
        )}
      </Box>
    </>
  );
};
