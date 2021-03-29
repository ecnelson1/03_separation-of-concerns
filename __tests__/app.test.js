const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('createOrder route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});

describe('getOrders route', () =>{
  it('returns all the orders in the database', () => {
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([{
          id: '1',
          quantity: 10,
        }]);
      });
  });
});

describe('getOrderById route', () =>{
  it('returns all the orders in the database for the given Id', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});

describe('updateOrder route', () => {
  it('updates the order quantity in the database for the given Id and sends a text message', () => {
    return request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 100 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 100,
        });
      });
  });
});

describe(' deleteOrderById route', () =>{
  it('deletes the order in the database for the given Id', () => {
    return request(app)
      .delete('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 100,
        }); //deleted item
      });
  });
});
