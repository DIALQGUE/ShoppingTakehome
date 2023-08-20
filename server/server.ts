import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpecs } from './swagger-spec';

import {
  ProductRepository,
  CouponRepositiory,
  OrderRepository,
} from '@Repositories';
const app: Express = express();

const productsRepository = new ProductRepository();
const couponRepository = new CouponRepositiory();
const orderRepository = new OrderRepository();

app.use(bodyParser.json());

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { explorer: true })
);

app.get('/products', (req: Request, res: Response) => {
  const products = productsRepository.getProducts();

  res.json(products);
});

app.get('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid id supplied');
  }

  const product = productsRepository.getProductById(Number(req.params.id));

  if (!product) res.status(404).send('Product not found');

  res.json(product);
});

app.get('/coupons', (req: Request, res: Response) => {
  const coupons = couponRepository.getCoupons();
  res.json(coupons);
});

app.get('/coupons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send('Invalid id supplied');
  }

  const coupon = couponRepository.getCouponById(Number(req.params.id));

  if (!coupon) res.status(404).send('Coupon not found');

  res.json(coupon);
});

app.listen(5000, () => console.log('Server running on port 5000 🚀'));
