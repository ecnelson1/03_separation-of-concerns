const { Router } = require('express');
const OrderService = require('../services/OrderService');
const pool = require('../utils/pool');

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
      const orders = await pool.query('SELECT * FROM orders')
      res.json(orders.rows);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try { 
    const order = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    res.json(order.rows);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updatedOrder = await pool.query(`
      UPDATE orders
      SET quantity = $1
      WHERE id = $2
      RETURNING *
       `,
       [order.quantity, id]
       );
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try{
      const deletedOrder = await pool.query(`DELETE FROM orders WHERE id=$1 RETURNING *`, [id]) 
    } catch (err) {
      next(err);
    }
  });
