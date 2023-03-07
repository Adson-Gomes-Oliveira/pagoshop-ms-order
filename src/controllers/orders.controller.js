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
};

const confirmOrder = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const payment = await axios.post('http://localhost:3004/api/payments/', payload)
    .then((result) => result.data);

  const order = await Orders.findByPk(id);

  const client = await axios.get(`http://localhost:3002/api/accounts/${order.clientId}`)
    .then((result) => result.data);

  const productIdList = order.productList.map((product) => product.productId);
  const productListFormated = await axios.get(`http://localhost:3001/api/products/order/${productIdList}`);

  console.log(productListFormated);

  const invoice = await axios.post(`http://localhost:3004/api/payments/confirm/${payment.id}`, {
    name: client.name,
    cpf: client.cpf,
    paymentId: payment.id,
    description: {
      buyerAddress: client.address,
      ordersList: productListFormated,
    },
  }).then((result) => result.data);

  console.log(invoice);

  await Orders.update({ status: 'PAYED' }, { where: { id } });

  return res.status(HTTPStatus.OK).json(invoice);
};

module.exports = {
  create,
  confirmOrder,
};
