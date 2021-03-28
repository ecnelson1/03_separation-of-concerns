const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try{
      const orders = 
    }
  })
  .get('/:id', async (req, res, next) => {

  })
  .put('/:id', async (req, res, next) => {

  })
  .delete('/:id', async (req, res, next) => {

  });
