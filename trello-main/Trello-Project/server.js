const app = require('../Backend/app')
const http = require('http');

const server = http.createServer((req, res) => {
  res.end("This is a test");
});

server.listen(3000)
