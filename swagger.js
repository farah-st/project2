const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'API for managing recipes',
  },
  host: 'https://project2-0vw8.onrender.com/',  // Change this to your deployed URL when deploying
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
