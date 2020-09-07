const express = require('express');
const teachers = require('./controllers/teachers');
const routes = express.Router();

routes.get("/", teachers.redirect);
routes.get("/teachers", teachers.index);
routes.get("/teachers/create", teachers.create);
routes.post("/teachers", teachers.post);


module.exports = routes;
