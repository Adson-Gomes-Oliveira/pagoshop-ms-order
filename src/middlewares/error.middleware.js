/* eslint-disable no-unused-vars */
const HTTPStatus = require('../helpers/HTTP.status');

const errorMiddleware = (err, _req, res, _next) => {
  if (!err.status) return res.status(HTTPStatus.INTERNAL).send(err);
  return res.status(err.status).send(err.message);
};

module.exports = errorMiddleware;
