const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth.middleware');
const Product = require('../models/productModel');


router.get('/filter', auth, productController.getFilterProducts);

router.get('/category', auth, async (req, res) => {
    try {
        let r = []
        let p = await Product.find({}).select('product_category_tree')
        for (let product of p) {
            r.push(product_category_tree[0].split(">>")[0].trim())
        }
        return res.send(r)

    } catch (error) {

    }
});

router.get('/', auth, productController.getAllProducts);

router.post('/', auth, productController.createProduct);

router.put('/:id', auth, productController.updateProduct);

router.get('/:id', auth, productController.getProductById);

router.patch('/:id/archive', auth, productController.archiveProduct);



module.exports = router;
