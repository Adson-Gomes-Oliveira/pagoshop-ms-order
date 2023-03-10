const JWT = require('jsonwebtoken');
const CustomError = require('./error.custom');
const HTTPStatus = require('./HTTP.status');

const verifyToken = (token) => {
  const verify = JWT.verify(token, process.env.JWT_SECRET);
  if (!verify) throw new CustomError('Token is invalid !', HTTPStatus.UNAUTHORIZED);

  return verify;
};

module.exports = {
  verifyToken,
};
