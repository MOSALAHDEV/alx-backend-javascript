#!/usr/bin/node
const express = require('express');

const app = express();
const port = 7865;

app.use(express.json());  // to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// numeric cart id only
app.get('/cart/:id(\\d+)', (req, res) => {
  res.send(`Payment methods for cart ${req.params.id}`);
});

// new endpoint
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// new endpoint
app.post('/login', (req, res) => {
  const { userName } = req.body;
  res.send(`Welcome ${userName}`);
});

app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

