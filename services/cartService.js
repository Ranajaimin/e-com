const Cart = require("../models/cartModel");

exports.addCart = async (userId, productId, quantity, price) => {
    try {
        let cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            // If no active cart exists, create a new one
            cart = new Cart({ user: userId, items: [{ product: productId, quantity, price }] });
            // console.log(cart)
        } else {
            // Check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Product doesn't exist in the cart, add it
                cart.items.push({ product: productId, quantity, price });
            }
        }

        return await cart.save();

    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
}