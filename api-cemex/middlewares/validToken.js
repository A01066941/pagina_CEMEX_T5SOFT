const { UnauthorizedError } = require('express-jwt');
const { StatusCodes } = require('http-status-codes');

module.exports = function (err, req, res, next) {
    if (err instanceof UnauthorizedError || !req.user) {
        // if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            error: 'Invalid or expired access token',
        });
    } else {
        return next(err);
    }
};
