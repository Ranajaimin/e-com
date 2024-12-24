const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const Cart = require('../models/cartModel');
const auth = require('../middlewares/auth.middleware');


router.get('/create', auth, categoryController.createCategory);

router.get('/parent', auth, categoryController.getParentCategory);

router.get('/used', auth, categoryController.getMostUsedCategory);

module.exports = router;