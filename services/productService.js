const Product = require('../models/productModel');

exports.getAllProducts = async (page = 1, limit = 10, selectedFields = '') => {
    const products = await Product.find({})
        .select('product_name image description retail_price discounted_price') // Select only the fields you want
        .skip((page - 1) * limit)
        .limit(limit);

    return products;
};

exports.getFilterProducts = async (category) => {
    try {
        const products = await Product.find({
            product_category_tree: { $regex: category, $options: 'i' }
        })
            .select('product_name image description retail_price discounted_price')
            .limit(20);
        return products
    }
    catch (error) {
        res.status(500).send('Error occurred while filtering products');
    }
}

exports.getProductById = async (id) => {
    let product = await Product.findById(id);
    let spec = product.product_specifications
    const fixedSpecifications = spec.replace(/=>/g, ':');

    // Step 2: Convert the fixed string into an object using JSON.parse
    product.product_specifications = JSON.parse(fixedSpecifications)

    product.product_specifications = product.product_specifications.product_specification


    return product
};

exports.createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

exports.updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

exports.archiveProduct = async (id) => {
    return await Product.findByIdAndUpdate(id, { archived: true }, { new: true });
};
