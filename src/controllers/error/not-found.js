'use strict';

const httpStatusCodes = require('http-status-codes');

module.exports = (req, res) => {
    res.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
};
