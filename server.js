"use strict";

const port = 80;

const express = require('express');
const path = require("path");
const app = express();
const util = require('util');
const pm2io = require('@pm2/io');
const eliapi = require('./eliapi.js');

app.use(express.static(path.join(__dirname, '/static')));

const server = app.listen(process.env.PORT || port, () => {
  eliapi.logMessage(0, "SERVER RUNNING: PORT: " + port);
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  eliapi.logMessage(0, "CLIENT CONNECTED WITH IP ADDRESS: " + socket.request.connection.remoteAddress.split(':').slice(3)[0]);
});
