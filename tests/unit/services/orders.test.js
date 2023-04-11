const { Orders } = require('../../../src/database/models');
const OrdersServices = require('../../../src/services/orders.service');
const HTTPStatus = require('../../../src/helpers/HTTP.status');
const {
  ORDER_MOCK_INSTANCE,
  ORDER_MOCK_PAYLOAD,
} = require('../../mocks/orders.mock');

describe('Testing Orders Services', () => {
  const orderInstanceKeys = Object.keys(ORDER_MOCK_INSTANCE);

  describe('GET: A specific order', () => {
    beforeAll(() => {
      jest.spyOn(Orders, 'findByPk').mockResolvedValueOnce(ORDER_MOCK_INSTANCE)
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const order = await OrdersServices.findById(ORDER_MOCK_INSTANCE.id);
      orderInstanceKeys.forEach((or) => {
        expect(order).toHaveProperty(or);
      });
    });

    it('should fail when content is not found and throw 404 error', async () => {
      try {
        await OrdersServices.findById(ORDER_MOCK_INSTANCE.id);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NOT_FOUND);
        expect(error.message).toBe('Content not found');
      }
    });

    it('should fail when id not found', async () => {
      try {
        await OrdersServices.findById();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('Id not found');
      }
    });
  });

  describe('POST: An order', () => {
    beforeAll(() => {
      jest.spyOn(Orders, 'create').mockResolvedValue(ORDER_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created with success', async () => {
      const order = await OrdersServices.create(ORDER_MOCK_PAYLOAD);
      orderInstanceKeys.forEach((or) => {
        expect(order).toHaveProperty(or);
      });
    });

    it('should fail when validation fails and throw 422 error', async () => {
      const { productList: _, ...orderWithoutProductList } = ORDER_MOCK_PAYLOAD;

      try {
        await OrdersServices.create(orderWithoutProductList);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.UN_ENTITY);
        expect(error.message).toBe('productList is required');
      }
    });
  });
});
