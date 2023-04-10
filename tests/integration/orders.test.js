/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const {
  ORDER_MOCK_PAYLOAD,
  // PAYMENT_MOCK_PAYLOAD,
} = require('../mocks/orders.mock');

describe('Testing orders CRUD', () => {
  it('POST: A new order should be created', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send(ORDER_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('productList');
    expect(response.body.productList).toBeInstanceOf(Array);
  });
});
