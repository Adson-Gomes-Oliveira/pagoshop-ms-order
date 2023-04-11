/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const {
  ORDER_MOCK_INSTANCE,
  ORDER_MOCK_PAYLOAD,
} = require('../mocks/orders.mock');

describe('Testing orders CRUD', () => {
  const orderInstanceKeys = Object.keys(ORDER_MOCK_INSTANCE);

  it('GET: A request should get an especific order', async () => {
    const response = await request(app)
      .get('/api/orders/1')
      .expect(HTTPStatus.OK);

    orderInstanceKeys.forEach((key) => {
      expect(response.body).toHaveProperty(key);
    });
  });

  it('POST: A new order should be created', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send(ORDER_MOCK_PAYLOAD);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('productList');
    expect(response.body.productList).toBeInstanceOf(Array);
  });
});
