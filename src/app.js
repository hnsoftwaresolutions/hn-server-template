'use strict';

const express = require('express');

const instances = require('./instances');

const app = express();

app.use(instances.helmetInstance);

module.exports = app;
