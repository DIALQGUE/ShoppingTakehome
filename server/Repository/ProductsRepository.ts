import { readFileSync } from 'fs';

import { Product } from '@Types';

export class ProductRepositiory {
  products: Product[];
  constructor() {
    this.products = JSON.parse(readFileSync('./products.json', 'utf8'));
  }

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
