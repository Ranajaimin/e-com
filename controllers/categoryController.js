const Product = require('../models/productModel')
const Category = require('../models/categoryModel');
const MOST_USED_CATEGORY = require('../constant/most_category');

exports.createCategory = async (req, res) => {
    const batchSize = 500; // Process products in batches
    let skip = 0;
    let productsProcessed = 0;

    while (true) {
        // Fetch a batch of products
        const products = await Product.find({}, 'product_category_tree').skip(skip).limit(batchSize);
        if (products.length === 0) break;

        for (const { product_category_tree } of products) {
            for (const categoryTree of product_category_tree) {
                const categories = categoryTree.split('>>').map(cat => cat.trim());
                let parentId = null;
                let path = '';

                for (const category of categories) {
                    path = path ? `${path} >> ${category}` : category;
                    const categoryId = path.toLowerCase().replace(/\s+/g, '_');

                    // Upsert the category to avoid duplicates
                    await Category.updateOne(
                        { _id: categoryId },
                        { $set: { name: category, parentId, path } },
                        { upsert: true }
                    );

                    parentId = categoryId; // Set parentId for the next level
                }
            }
        }

        productsProcessed += products.length;
        skip += batchSize;

        console.log(`Processed ${productsProcessed} products`);
    }

    console.log('Category collection populated successfully.');
}


exports.getParentCategory = async (req, res) => {
    try {
        // Find categories where parentId is null (i.e., top-level categories)
        const parentCategories = await Category.find({ parentId: null }).select('_id name path');
        res.json(parentCategories);
    } catch (error) {
        console.error('Error fetching parent categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMostUsedCategory = async (req, res) => {
    try {
        console.log("called")
        // Find categories where parentId is null (i.e., top-level categories)
        const parentCategories = MOST_USED_CATEGORY
        console.log(parentCategories)
        res.json(parentCategories);
    } catch (error) {
        console.error('Error fetching parent categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

