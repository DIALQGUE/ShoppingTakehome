import React, { ChangeEvent } from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import { PRODUCT_CATEGORY, ProductType } from 'src/utils/types';
import { useOrderContext } from '../containers/OrderProvider';

const CATEGORY_COLOR_MAP = {
  [PRODUCT_CATEGORY.FASHION]: 'pink',
  [PRODUCT_CATEGORY.ELECTRONICS]: 'lightblue',
  [PRODUCT_CATEGORY.FURNITURE]: 'lightgreen',
  [PRODUCT_CATEGORY.HOUSEHOLD]: 'lightyellow',
};

type ProductProps = {
  product: ProductType;
  defaultChecked?: boolean;
};

export const Product = (props: ProductProps) => {
  const { orderActions } = useOrderContext();
  const { product, defaultChecked } = props;
  const { name, price, description, category } = product;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    checked
      ? orderActions.addProduct(product)
      : orderActions.removeProduct(product);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
        padding: 2,
        border: '1px solid black',
        bgcolor: CATEGORY_COLOR_MAP[category] ?? 'inherit',
      }}
    >
      <Box>
        <Typography children={name} />
        <Typography children={`${price} baht`} />
        <Typography children={description} />
        <Typography children={category} />
      </Box>
      <Checkbox
        name={product.name}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
    </Box>
  );
};
