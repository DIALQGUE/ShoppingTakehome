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
