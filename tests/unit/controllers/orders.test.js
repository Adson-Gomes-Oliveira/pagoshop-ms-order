const OrdersControllers = require('../../../src/controllers/orders.controller');
const OrdersServices = require('../../../src/services/orders.service');
const HTTPStatus = require('../../../src/helpers/HTTP.status');
const {
  ORDER_MOCK_INSTANCE,
  ORDER_MOCK_PAYLOAD,
} = require('../../mocks/orders.mock');

describe('Testing Orders Controllers', () => {
  const request = {};
  const response = {};

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();

    jest.spyOn(OrdersServices, 'findById').mockResolvedValue(ORDER_MOCK_INSTANCE);
    jest.spyOn(OrdersServices, 'create').mockResolvedValue(ORDER_MOCK_INSTANCE);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a order is requested the status code 200 must be returned', async () => {
    request.params = { id: ORDER_MOCK_INSTANCE.id };
    await OrdersControllers.findById(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith(ORDER_MOCK_INSTANCE);
  });

  it('POST: When a order is created the status code 201 must be returned', async () => {
    request.body = ORDER_MOCK_PAYLOAD;
    await OrdersControllers.create(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith(ORDER_MOCK_INSTANCE);
  });
});
