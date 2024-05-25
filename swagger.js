const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'], // Include both HTTP and HTTPS
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app'); 
});

