const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sql = require('mssql');
const validJson = require('./middlewares/validJson');
const errorHandler = require('./middlewares/errorHandler');

// get .env config vars
dotenv.config();

// optional env
const PORT = process.env.PORT || 3000;
process.env.TOKEN_SECRET =
    process.env.TOKEN_SECRET ||
    require('crypto').randomBytes(64).toString('hex');

// required env
const DB_CONFIG = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME,
    pool: {
        max: parseInt(process.env.DB_MAX_POOL) || 10,
        min: parseInt(process.env.DB_MIN_POOL) || 0,
        idleTimeoutMillis: parseInt(process.env.DB_POOL_TIMEOUT) || 30000,
    },
    options: {
        encrypt: true,
        trustServerCertificate: false, // change to true for local dev / self-signed certs
    },
};

// routes need to be imported after loading env
const authRoutes = require('./routes/auth');

// init app
const app = express();

// init DB connection pool
app.locals.dbPool = new sql.ConnectionPool(DB_CONFIG);
app.locals.dbPoolConnect = app.locals.dbPool.connect();

// allow cors
app.use(cors());

// enable JSON parsing middleware
app.use(express.json());

// use JSON parsing error handling middleware
app.use(validJson);

// use routes
app.use('/auth', authRoutes);

// handle all unexpected internal errors
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
