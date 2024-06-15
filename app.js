const express = require('express');
const { initDb } = require('./db/connect');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { auth } = require('express-openid-connect');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
   origin: 'https://project2-0vw8.onrender.com'
}));
app.use(morgan('combined'));

// Auth0 middleware
app.use(auth(config));

// Auth check route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Routes
app.use('/recipes', recipesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Serve Swagger JSON
app.get('/swagger-output.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger-output.json'));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
  swaggerOptions: {
    url: '/swagger-output.json'
  }
}));

app.get('/swagger-output.json', (req, res) => {
  res.sendFile(__dirname + '/swagger-output.json');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal error occurred.' });
});

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});



//https://project2-0vw8.onrender.com/login -> Auth0 working
