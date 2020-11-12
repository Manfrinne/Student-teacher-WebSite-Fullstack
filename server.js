const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const routers = require('./routes')
const methodOverride = require('method-override')

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routers)

server.set('view engine', 'njk')
nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(7070, function() {
  console.log('server RUN!')
})

