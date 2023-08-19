import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/products', (req: Request, res: Response) => {
  const products = {};
  res.json(products);
});

app.listen(5000, () => console.log('Server running on port 5000 🚀'));
