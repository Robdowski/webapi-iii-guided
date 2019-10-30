const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// the three amigos
function dateLogger(req, res, next) {
  console.log(new Date().toISOString())
  next()
}

function httpMethodLogger(req, res, next) {
  console.log('HTTP Method', req.method)
  console.log('Visited URL', req.originalUrl)
  next()
}

// global middleware - runs on every request that comes to server
server.use(helmet())
server.use(express.json());
server.use(dateLogger)
server.use(httpMethodLogger)


server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
