'use strict';

const httpStatusCodes = require('http-status-codes');

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        // TODO: This might cause security problems. Error info might be seen by end user.
        // TODO: See info about what this does at https://expressjs.com/en/guide/error-handling.html
        return next(err);
    }

    return res.sendStatus(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
};
