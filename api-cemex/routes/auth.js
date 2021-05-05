const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('express-jwt');
const validToken = require('../middlewares/validToken');
const { StatusCodes } = require('http-status-codes');
const sql = require('mssql');

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const ACCESS_EXPIRATON = parseInt(process.env.ACCESS_EXPIRATON) || 1800;
const REFRESH_EXPIRATION = parseInt(process.env.REFRESH_EXPIRATION) || 259200;

router = express.Router();

router.get(
    '/',
    jwtMiddleware({ secret: TOKEN_SECRET, algorithms: ['HS256'] }),
    validToken,
    (_, res) => {
        return res.send({ logged: true });
    }
);

router.post('/login', async (req, res, next) => {
    try {
        const userOrEmail = req.body.userOrEmail;
        const password = req.body.password;
        if (userOrEmail === undefined || password === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: 'No user or email, or no password specified',
            });
        }

        const hash = await getPasswordHash(userOrEmail, req.app.locals);
        if (hash == undefined) {
            return res.status(StatusCodes.FORBIDDEN).send({
                error: 'Invalid login credentials',
            });
        }

        return bcrypt.compare(password, hash, (err, match) => {
            if (err) {
                next(err);
            } else if (!match) {
                return res.status(StatusCodes.FORBIDDEN).send({
                    error: 'Invalid login credentials',
                });
            } else {
                return res.send(generateTokens(userOrEmail));
            }
        });
    } catch (err) {
        return next(err);
    }
});

router.post('/refresh', (req, res, next) => {
    try {
        const refreshToken = req.body.refresh;
        if (refreshToken === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                error: 'Missing refresh token',
            });
        }

        return jwt.verify(refreshToken, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    return res.status(StatusCodes.GONE).send({
                        error: 'Invalid or expired refresh token',
                    });
                } else {
                    return next(err);
                }
            } else {
                return res.send(generateTokens(decoded.userOrEmail));
            }
        });
    } catch (err) {
        return next(err);
    }
});

// TODO: change the query for a procedure?
async function getPasswordHash(userOrEmail, locals) {
    await locals.dbPoolConnect;
    const result = await locals.dbPool
        .request()
        .input('cred', sql.VarChar, userOrEmail)
        .query(
            'SELECT pwHash FROM USER_INFO WHERE username = @cred OR email = @cred'
        );

    return result.recordset[0] && result.recordset[0].pwHash;
}

function generateTokens(userOrEmail) {
    return {
        access: jwt.sign({ userOrEmail: userOrEmail }, TOKEN_SECRET, {
            expiresIn: ACCESS_EXPIRATON,
        }),
        refresh: jwt.sign({ userOrEmail: userOrEmail }, TOKEN_SECRET, {
            expiresIn: REFRESH_EXPIRATION,
        }),
    };
}

module.exports = router;
