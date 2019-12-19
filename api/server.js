const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const apiRouter = require('../api/api-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);
server.use('/api', usersRouter);

server.get('/api', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;