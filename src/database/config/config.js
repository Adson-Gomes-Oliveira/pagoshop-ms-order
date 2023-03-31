module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_DATABASE || 'order',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  test: {
    username: 'root',
    password: 'secret',
    database: 'order-test',
    host: '127.0.0.1',
    port: '3307',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'null',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
