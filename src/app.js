'use strict';

const express = require('express');

const instances = require('./instances');

const app = express();

app.use(instances.helmetInstance);
app.use(instances.expressRateLimitInstance);

module.exports = app;
