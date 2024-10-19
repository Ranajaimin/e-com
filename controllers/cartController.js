const cartService = require('../services/cartService');

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity, price } = req.body;
        console.log(userId, productId, quantity, price)
        const products = await cartService.addCart(userId, productId, quantity, price);
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};