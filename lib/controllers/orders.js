const { Router } = require('express');
const Order = require('../models/order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const orders = await Order.get();
      res.send(orders);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    const id = req.params.id;
    try { 
      const order = await Order.getById(id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
      const order = await Order.update(req.body, id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
      const deletedOrder = await Order.delete(id);
      res.send(deletedOrder); 
    } catch(err) {
      next(err);
    }
  });
