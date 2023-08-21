import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export const Success = () => {
  const navigate = useNavigate();
  const handleStartShopping = () => {
    navigate('/');
  };
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        children={'Your Order is success'}
      />
      <Button variant="contained" color="primary" onClick={handleStartShopping}>
        Back to Home
      </Button>
    </>
  );
};
