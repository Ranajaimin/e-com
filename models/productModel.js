const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    uniq_id: { type: String, required: true },
    crawl_timestamp: { type: Date, required: true },
    product_url: { type: String, required: true },
    product_name: { type: String, required: true },
    product_category_tree: { type: [String], required: true },
    pid: { type: String, required: true },
    retail_price: { type: Number, required: true },
    discounted_price: { type: Number, required: true },
    image: { type: [String], required: true },
    is_FK_Advantage_product: { type: Boolean, required: true },
    description: { type: String, required: true },
    product_rating: { type: String, default: "No rating available" },
    overall_rating: { type: String, default: "No rating available" },
    brand: { type: String, required: true },
    product_specifications: { type: Object, of: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
