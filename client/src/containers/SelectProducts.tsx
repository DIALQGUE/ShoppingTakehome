import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormGroup } from '@mui/material';
import { Product } from '../components/Product';
import { ProductType } from 'src/utils/types';

export const SelectProducts = () => {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  useEffect(() => {
    axios.get('http://localhost:5000/products').then((res) => {
      const fetchedProducts = res.data;
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <FormGroup>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </FormGroup>
  );
};
