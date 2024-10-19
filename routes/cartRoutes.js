const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth.middleware');
const Cart = require('../models/cartModel');


router.post('/add', auth, cartController.addCart);

module.exports = router;