require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const orderRoutes = require('./routes/orders.route');
const swaggerDocument = require('../swagger/orders-swagger.json');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/health-check', (_req, res) => res.status(200).send('Connection OK'));
app.use('/api/orders', orderRoutes);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = app;
