import express from 'express';

const app = express();

app.get('/products', (req, res) => {
  const products = {};
  res.json(products);
});

app.listen(5000, () => console.log('Server running on port 5000 🚀'));
