import { readFileSync } from 'fs';

import { Product } from '@Types';

export class ProductRepository {
  products: Product[];
  constructor() {
    const rawProducts = JSON.parse(
      readFileSync('./mock/products.json', 'utf8')
    );
    this.products = rawProducts.map(
      (rawProduct: Product) => new Product(rawProduct)
    );
    console.log('Products loaded from file successfully 🛍️');
  }

  public getProducts() {
    return this.products;
  }

  public getProductsByIds(ids: number[]) {
    return this.products.filter((product) => ids.includes(product.id));
  }

  public getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
