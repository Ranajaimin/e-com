const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getFilterProducts = async (req, res) => {
    try {
        const category = req.body.category
        const products = await productService.getFilterProducts(category);
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.archiveProduct = async (req, res) => {
    try {
        const product = await productService.archiveProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product archived', product });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};


