const { Router } = require('express');
const Order = require('../models/Order');
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
      const orders = await Order.get();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try { 
    const order = await Order.getById(id)
    res.send(order)
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const updatedOrder = await Order.update(id)
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try{
      const deletedOrder = await Order.delete(id) 
    } catch (err) {
      next(err);
    }
  });
