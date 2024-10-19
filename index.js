const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectToMongoDB = require('./db/mongo')
const YAML = require('yamljs');
require('dotenv').config();
const swaggerDocument = YAML.load('./config/swagger.yaml'); // Load your YAML file



const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the version of OpenAPI
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'API documentation',
            contact: {
                name: 'Your Name',
            },
            servers: [
                {
                    url: 'http://localhost:3000', // Replace with your server URL
                },
            ],
        },
    },
    apis: ['./routes/*.js'], // Path to the API docs (You can modify this to match your directory)
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve the Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectToMongoDB();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
