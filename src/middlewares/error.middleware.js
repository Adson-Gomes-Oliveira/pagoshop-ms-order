const HTTPStatus = require('../helpers/HTTP.status');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  if (err.status >= HTTPStatus.INTERNAL) return res.status(err.status).send(err.message);
  return res.status(err.status).send(err.message);
}

module.exports = errorMiddleware;
