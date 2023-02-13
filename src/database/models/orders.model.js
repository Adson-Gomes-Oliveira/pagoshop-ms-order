'use strict';

const Orders = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    clientId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    moreInfo: DataTypes.STRING,
    cep: DataTypes.BIGINT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    productList: DataTypes.JSON
  }, {
    underscored: true,
    tableName: 'orders',
  });

  return Orders
}

module.exports = Orders;
