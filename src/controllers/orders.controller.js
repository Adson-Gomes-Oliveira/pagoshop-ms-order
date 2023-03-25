const axios = require('axios');
const { Orders } = require('../database/models');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/orders.validation');
require('dotenv');

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await Orders.findByPk(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;
  payload.status = 'DONE';
  validate.payload(payload);

  const response = await Orders.create(payload);
  return res.status(HTTPStatus.CREATED).json(response);
};

const confirmOrder = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { authorization: token } = req.headers;

  const payment = await axios.post(`http://${process.env.PAYMENT_HOST || '127.0.0.1'}:3004/api/payments/`, payload, {
    headers: { Authorization: token },
  })
    .then((result) => result.data);

  const order = await Orders.findByPk(id);

  const client = await axios.get(`http://${process.env.ACCOUNT_HOST || '127.0.0.1'}:3002/api/accounts/${order.clientId}`, {
    headers: { Authorization: token },
  })
    .then((result) => result.data);

  const productListFormated = await axios.post(`http://${process.env.PRODUCT_HOST || '127.0.0.1'}:3001/api/products/order/`, order.productList, {
    headers: { Authorization: token },
  })
    .then((result) => result.data);

  const invoice = await axios.post(`http://${process.env.PAYMENT_HOST || '127.0.0.1'}:3004/api/payments/confirm/${payment.id}`, {
    name: client.name,
    cpf: client.cpf,
    paymentId: payment.id,
    description: {
      buyerAddress: client.address,
      productsOrdered: productListFormated,
    },
  }, {
    headers: { Authorization: token },
  }).then((result) => result.data);

  await Orders.update({ status: 'PAYED' }, { where: { id } });

  return res.status(HTTPStatus.OK).json(invoice);
};

module.exports = {
  getById,
  create,
  confirmOrder,
};
