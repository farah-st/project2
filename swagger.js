const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'API for managing recipes',
  },
  host: 'project2-0vw8.onrender.com',  // Only the hostname
  schemes: ['https'],  // Add schemes if your API uses HTTPS
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

