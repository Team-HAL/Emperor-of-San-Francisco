'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./gameLogic.js')(io);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

const port = process.env.PORT || 8000;
server.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
