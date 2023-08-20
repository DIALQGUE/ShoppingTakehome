import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
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
    <>
      <FormGroup>
        {products.map((product) => (
          <FormControlLabel
            key={product.id}
            control={<Checkbox name={product.name} />}
            label={product.name}
          />
        ))}
      </FormGroup>
    </>
  );
};
