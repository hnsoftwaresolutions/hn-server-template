'use strict';

const express = require('express');

const instances = require('./instances');
const controllers = require('./controllers');

const app = express();

app.use(instances.helmetInstance);
app.use(instances.expressRateLimitInstance);

app.use(controllers.errorController.notFound);

module.exports = app;
