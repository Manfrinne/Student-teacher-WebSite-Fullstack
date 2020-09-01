const express = require('express');
const nunjucks = require('nunjucks');
const server = express();

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function(req, res) {
    return res.render("layout");
});

server.listen(8080, function() {
    console.log("server RUN!");
});

