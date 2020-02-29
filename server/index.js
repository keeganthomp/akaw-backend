const express = require('express');
const routes = require('../routes');
const app = express()

const server = require('http').createServer(app);
app.use(express.json());

app.use('/api', routes);

module.exports = server;