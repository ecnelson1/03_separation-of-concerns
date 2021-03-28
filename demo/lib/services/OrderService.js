  const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }
  static async update({ quantity }, id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order UPDATED for ${id}`
    );
    const order = await Order.update({ quantity }, id);
    return order
  }
  static async cancel(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order CANCELED for ${id}`
    );
    const order = await Order.delete(id);
    return order
  }

};
