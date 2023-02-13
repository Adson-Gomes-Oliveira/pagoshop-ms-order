const axios = require('axios');
const { Orders } = require('../database/models');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/orders.validation');

const create = async (req, res) => {
  const payload = req.body;
  validate.payload(payload);

  payload.status = 'DONE';
  const response = await Orders.create(payload);
  return res.status(HTTPStatus.CREATED).json(response);
}

const formatProductList = async (product) => {
  const productDB = await axios.get(`localhost:3001/api/products/${product.id}`);
  return {
    productName: productDB.product,
    quantity: product.quantity,
    price: product.actualUnitPrice - product.discount
  }
} 

const confirmOrder = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const payment = await axios.post(`localhost:3004/api/payments/`, payload);
  const order = await axios.get(`localhost:3003/api/orders/${id}`);
  const client = await axios.get(`localhost:3002/api/accounts/${order.client_id}`);

  const productListFormated = order.productList.map(formatProductList);

  const invoice = await axios.post(`localhost:3004/api/payments/confirm/${payment.id}`, {
    name: client.name,
    cpf: client.cpf,
    address: client.address,
    ordersList: productListFormated,
  });

  await Orders.update({ status: 'PAYED' }, { where: { id } });

  return res.status(HTTPStatus.OK).json(invoice);
}

module.exports = {
  create,
  confirmOrder,
}
