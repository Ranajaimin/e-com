// mongo.js

const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL (replace with your connection string)
const mongoURI = process.env.MONGO_URL;

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToMongoDB;
