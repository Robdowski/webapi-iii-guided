const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// the three amigos
function httpMethodLogger(req, res, next) {
  console.log(`My own logger: [${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)
  next()
}

const gatekeeper = (req, res, next) => {
  // new way of reading data sent by the client
  const password = req.headers.password

  if (!password){
    res.status(400).json({message: "Please provide a password"})
  } else if (password.toLowerCase() === 'mellon'){
    next()
  } else {
    res.status(400).json({you: 'cannot pass!!'})
  }
}

// global middleware - runs on every request that comes to server
server.use(helmet())
server.use(express.json());
server.use(gatekeeper)
server.use(morgan('dev'))
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
