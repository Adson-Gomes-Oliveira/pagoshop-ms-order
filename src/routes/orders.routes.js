const { Router } = require('express');
const passport = require('passport');
const ordersController = require('../controllers/orders.controller');

const router = Router();

router.use('/', passport.authenticate('bearer', { session: false }));
router.post('/', ordersController.create);
router.post('/confirm/:id', ordersController.confirmOrder);

module.exports = router;
