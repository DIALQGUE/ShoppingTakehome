import { readFileSync } from 'fs';

import { Product } from '@Types';

export class ProductRepository {
  products: Product[];
  constructor() {
    this.products = JSON.parse(
      readFileSync('./Repository/products.json', 'utf8')
    );
    console.log('Product loaded from file successfully 🛍️');
  }

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
