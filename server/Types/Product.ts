export enum PRODUCT_CATEGORY {
  FASHION = 'Fashion',
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  HOUSEHOLD = 'Household',
}

export type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: PRODUCT_CATEGORY;
};

export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: PRODUCT_CATEGORY;

  constructor(product: ProductType) {
    this.id = product.id ?? Math.floor(Math.random() * 1000000);
    this.name = product.name ?? '';
    this.price = product.price ?? 0;
    this.description = product.description ?? '';
    this.category = product.category ?? PRODUCT_CATEGORY.HOUSEHOLD;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: PRODUCT_CATEGORY): void {
    this.category = category;
  }
}
