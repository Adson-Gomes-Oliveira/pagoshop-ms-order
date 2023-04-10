const OrdersServices = require('../services/orders.service');
const HTTPStatus = require('../helpers/HTTP.status');

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await OrdersServices.findById(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;

  const response = await OrdersServices.create(payload);
  return res.status(HTTPStatus.CREATED).json(response);
};

module.exports = {
  getById,
  create,
};
