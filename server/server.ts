import express, { Express, Request, Response } from 'express';
import { ProductRepository, CouponRepositiory } from '@Repositories';

const app: Express = express();

const productsRepository = new ProductRepository();
const couponRepository = new CouponRepositiory();

app.get('/products', (req: Request, res: Response) => {
  const products = productsRepository.getProducts();
  res.json(products);
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = productsRepository.getProductById(Number(req.params.id));
  res.json(product);
});

app.get('/coupons', (req: Request, res: Response) => {
  const coupons = couponRepository.getCoupons();
  res.json(coupons);
});

app.get('/coupons/:id', (req: Request, res: Response) => {
  const coupon = couponRepository.getCouponById(Number(req.params.id));
  res.json(coupon);
});

app.listen(5000, () => console.log('Server running on port 5000 🚀'));
