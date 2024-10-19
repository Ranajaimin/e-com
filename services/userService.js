const users = [];  // Example array acting as a mock database
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUsers = () => {
    return Promise.resolve(users);  // Simulating asynchronous DB call
};

exports.createUser = async (name, email, password) => {

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return { msg: 'User already exists' };
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password,
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        return await user.save();
    } catch (error) {
        return error
    }
};


exports.loginUser = async (email, password) => {
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return { msg: 'Invalid credentials', status: 400 };
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { msg: 'Invalid credentials', status: 400 };
        }

        // Generate a JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Sign the token and return it
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: '1h' }, // Token expires in 1 hour
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        });

        return { token, status: 200 }; // Return the token and status code
    } catch (error) {
        console.error(error.message);
        return { msg: 'Server error', status: 500 };
    }
};