import { FormGroup } from '@mui/material';

import { ProductType } from '../utils/types';
import { Product } from '../components';
import { useOrderContext } from './OrderProvider';

type SelectProductsProps = {
  products: ProductType[];
};

export const SelectProducts = (props: SelectProductsProps) => {
  const { order, orderActions } = useOrderContext();
  const { products } = props;
  const { products: selectedProducts } = order;
  return (
    <FormGroup>
      {products.map((product) => (
        <Product
          product={product}
          defaultChecked={selectedProducts?.includes(product)}
        />
      ))}
    </FormGroup>
  );
};
