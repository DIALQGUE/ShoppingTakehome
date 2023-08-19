import express, { Express, Request, Response } from 'express';
import { ProductRepository, CouponRepositiory } from '@Repositories';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app: Express = express();

const productsRepository = new ProductRepository();
const couponRepository = new CouponRepositiory();

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Takehome Test Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple API application made with Express and documented with Swagger for the the Takehome Test.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Wanna Wannasin',
        url: 'https://github.com/DIALQGUE',
        email: 'fang.wanna.wannasin@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./server.ts'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

/**
 * @swagger
 * components:
 *   schemas:
 *     productSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product's ID.
 *         name:
 *           type: string
 *           description: The product's name.
 *         price:
 *           type: integer
 *           description: The product's price.
 *         description:
 *           type: string
 *           description: The product's description.
 *         category:
 *           type: string
 *           description: The product's category.
 *     couponSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The coupon's ID.
 *         campaign:
 *           type: string
 *           description: The coupon's campaign.
 *         description:
 *           type: string
 *           description: The coupon's description.
 *         category:
 *           type: string
 *           description: The coupon's category.

 */

/**
 * @swagger
 * /products:
 *   get:
 *     description: Use to request all products
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productSchema'
 *             example:
 *               id: 10
 *               name: 'T-Shirt'
 *               price: 150
 *               description: 'This is a T-Shirt'
 *               category: 'Fashion'
 *       '500':
 *         description: Internal server error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Internal server error
 */
app.get('/products', (req: Request, res: Response) => {
  const products = productsRepository.getProducts();

  res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Use to request a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the product
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: A product object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productSchema'
 *             example:
 *               id: 10
 *               name: 'T-Shirt'
 *               price: 150
 *               description: 'This is a T-Shirt'
 *               category: 'Fashion'
 *       '400':
 *         description: Invalid id supplied
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Invalid id supplied
 *       '404':
 *         description: product not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: product not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Internal server error
 */
app.get('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid id supplied');
  }

  const product = productsRepository.getProductById(Number(req.params.id));

  if (!product) res.status(404).send('Product not found');

  res.json(product);
});

/**
 * @swagger
 * /coupons:
 *   get:
 *     description: Use to request all coupons
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/couponSchema'
 *             example:
 *               id: 10
 *               campaign: 'fixedAmount'
 *               description: 'Fixed amount discount 50 baht'
 *               category: 'coupon'
 *       '500':
 *         description: Internal server error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Internal server error
 */
app.get('/coupons', (req: Request, res: Response) => {
  const coupons = couponRepository.getCoupons();
  res.json(coupons);
});

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     description: Use to request a coupon by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the coupon
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/couponSchema'
 *             example:
 *               id: 10
 *               campaign: 'fixedAmount'
 *               description: 'Fixed amount discount 50 baht'
 *               category: 'coupon'
 *       '400':
 *         description: Invalid id supplied
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Invalid id supplied
 *       '404':
 *         description: Coupon not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Coupon not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: Internal server error
 */
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
