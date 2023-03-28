const { Router } = require('express');
const ordersController = require('../controllers/orders.controller');

const router = Router();

router.get('/:id', ordersController.getById);
router.post('/', ordersController.create);
router.post('/confirm/:id', ordersController.confirmOrder);

module.exports = router;
