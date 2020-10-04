'use strict';

const expressRateLimit = require('express-rate-limit');

const MILLISECONDS = 1000;
const SECONDS = 60;
const MINUTES = 15;
const REQUEST_COUNT = 9999;

module.exports = expressRateLimit({
    windowMs:
        process.env.RATE_LIMIT_RESET_TIME_MS
        || MINUTES * SECONDS * MILLISECONDS,
    max: process.env.RATE_LIMIT_REQUEST_COUNT
        || REQUEST_COUNT
});
