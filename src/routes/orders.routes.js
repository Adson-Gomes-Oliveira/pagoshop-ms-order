const { Router } = require('express');
const ordersControllers = require('../controllers/orders.controller');

const router = Router();

router.get('/:id', ordersControllers.findById);
router.post('/', ordersControllers.create);

module.exports = router;
