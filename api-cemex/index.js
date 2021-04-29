const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');

// get .env config vars
dotenv.config();

// optional env
const PORT = process.env.PORT || 3001;
const TOKEN_SECRET =
    process.env.TOKEN_SECRET ||
    require('crypto').randomBytes(64).toString('hex');
const ACCESS_EXPIRATON = process.env.ACCESS_EXPIRATON || 1800;
const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || 259200;

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

// init DB connection pool
const pool = new sql.ConnectionPool(DB_CONFIG);
const poolConnect = pool.connect();

// init app
const app = express();

// allow cors
app.use(cors());

// enable parsing middleware
app.use(express.json());

// use JSON parsing error handling middleware
app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(StatusCodes.BAD_REQUEST).send({ err: 'Invalid JSON data' });
        console.log(err.message);
    } else {
        // pass the error to the next middleware if it wasn't a JSON parse error
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/auth/login', (req, res) => {
    console.log(req.body);
    try {
        const accessToken = req.body.access;
        if (accessToken === undefined) {
            res.status(StatusCodes.BAD_REQUEST).send({
                err: 'Missing access token',
            });
            return;
        }

        jwt.verify(accessToken, TOKEN_SECRET, (err, _) => {
            if (err) {
                res.status(StatusCodes.GONE).send({
                    err: 'Invalid or expired refresh token',
                });
            } else {
                res.send({ logged: true });
            }
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            err: 'Error while processing login verification request',
        });
        console.log(err.message);
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const userOrEmail = req.body.userOrEmail;
        const password = req.body.password;
        if (userOrEmail === undefined || password === undefined) {
            res.status(StatusCodes.BAD_REQUEST).send({
                err: 'No user or email, or no password specified',
            });
            return;
        }

        const hash = await getPasswordHash(userOrEmail);
        if (hash == undefined) {
            res.status(StatusCodes.FORBIDDEN).send({
                err: 'Invalid login credentials',
            });
            console.log('Invalid user or email');
            return;
        }

        bcrypt.compare(password, hash, (err, match) => {
            if (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    err: 'Error while processing login request',
                });
                console.log(err.message);
            } else if (!match) {
                res.status(StatusCodes.FORBIDDEN).send({
                    err: 'Invalid login credentials',
                });
                console.log('Invalid password');
            } else {
                res.send(generateTokens(userOrEmail));
            }
        });
    } catch (err) {
        sendError();
        console.log(err.message);
    }
});

app.post('/auth/refresh', (req, res) => {
    try {
        const refreshToken = req.body.refresh;
        if (refreshToken === undefined) {
            res.status(StatusCodes.BAD_REQUEST).send({
                err: 'Missing refresh token',
            });
            return;
        }

        jwt.verify(refreshToken, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(StatusCodes.GONE).send({
                    err: 'Invalid or expired refresh token',
                });
                if (!err instanceof jwt.TokenExpiredError) {
                    console.log(err.message);
                }
            } else {
                res.send(generateTokens(decoded.userOrEmail));
            }
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            err: 'Error while processing auth request',
        });
        console.log(err.message);
    }
});

// TODO: IMPORTANT!
// Escape SQL to prevent injection
async function getPasswordHash(userOrEmail) {
    try {
        await poolConnect;
        const result = await pool.query`SELECT pwHash FROM USER_INFO WHERE username='${userOrEmail}' OR email='${userOrEmail}'`;
        return result.recordset[0];
    } catch (err) {
        console.log(err.message);
    }
}

function generateTokens(userOrEmail) {
    return {
        access: jwt.sign(userOrEmail, TOKEN_SECRET, {
            expiresIn: ACCESS_EXPIRATON,
        }),
        refresh: jwt.sign(userOrEmail, TOKEN_SECRET, {
            expiresIn: REFRESH_EXPIRATION,
        }),
    };
}
