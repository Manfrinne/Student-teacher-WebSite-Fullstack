const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const routers = require('./routes');

server.use(express.static('public'));

server.use(routers);

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(7070, function() {
  console.log("server RUN!");
});

