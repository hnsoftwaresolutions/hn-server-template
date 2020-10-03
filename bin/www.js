'use strict';

const http = require('http');

const app = require('../src/app');

const PORT = 3206;

http.createServer(app)
    .listen(process.env.PORT || PORT);
