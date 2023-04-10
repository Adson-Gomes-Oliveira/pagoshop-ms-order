const { Orders } = require('../database/models');
const HTTPStatus = require('../helpers/HTTP.status');
const CustomError = require('../helpers/error.custom');
const validate = require('../validations/orders.validation');

const findById = async (id) => {
  if (!id) throw CustomError('Id not found', HTTPStatus.BAD_REQUEST);

  const response = await Orders.findByPk(id);

  if (!response) throw CustomError('Content not found', HTTPStatus.NOT_FOUND);

  return response;
};

const create = async (payload) => {
  const newPayload = { ...payload, status: 'CREATED' };
  validate.payload(newPayload);

  const response = await Orders.create(newPayload);

  return response;
};

module.exports = {
  findById,
  create,
};
