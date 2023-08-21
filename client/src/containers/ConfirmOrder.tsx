import { useOrderContext } from './OrderProvider';
import { Box, Typography } from '@mui/material';

export const ConfirmOrder = () => {
  const { order, orderData } = useOrderContext();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography variant={'h3'} align={'center'}>
        Order Detail
      </Typography>
      {order.products?.map((product) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography children={product.name} />
          <Typography children={`${product.price} baht`} />
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: 1,
          mt: 5,
          pt: 1,
        }}
      >
        <Typography children={'Coupon Discount:'} />
        <Typography
          children={`${order.totalPrice - orderData.priceBeforeOnTop} baht`}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography children={'On Top Discount:'} />
        <Typography
          children={`${
            orderData.priceBeforeOnTop - orderData.priceBeforeSeasonal
          } baht`}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography children={'Seasonal Discount:'} />
        <Typography
          children={`${orderData.priceBeforeSeasonal - order.netPrice} baht`}
        />
      </Box>
    </Box>
  );
};
