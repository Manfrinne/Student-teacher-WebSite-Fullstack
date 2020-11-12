const express = require('express')
const teachers = require('./controllers/teachers')
const routes = express.Router()

routes.get("/", teachers.redirect)
routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.post("/teachers", teachers.post)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)
routes.put("/teachers", teachers.update)
routes.delete("/teachers", teachers.delete)


module.exports = routes
