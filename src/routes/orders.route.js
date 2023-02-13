const { Router } = require('express');
const ordersController = require('../controllers/orders.controller');

const router = Router();

router.post('/', ordersController.create);
router.post('/confirm', ordersController.confirmOrder);

module.exports = router;
