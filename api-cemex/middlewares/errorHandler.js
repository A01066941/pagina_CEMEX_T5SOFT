const { StatusCodes } = require('http-status-codes');

module.exports = function (err, _, res, _) {
    console.error(err.stack);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: 'There was an error processing the request',
    });
};
