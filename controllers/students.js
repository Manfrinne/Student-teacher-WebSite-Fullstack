
const fs = require('fs') 
const data = require('../data.json') 
const {age, date, academic_level, dateBirth} = require('../utils.js') 

exports.redirect = function(req, res) {
  return res.redirect("students") 
} 

exports.index = function(req, res) {
  return res.render("students/index", {students: data.students}) 
} 

exports.create = function(req, res) {
  return res.render("students/create") 
} 

exports.post = function(req, res) {

  //Com o constructor Object.keys eu posso
  //acessar as propriedades sem pegar os valores
  const keys = Object.keys(req.body) 

  let {avatar_url, name, birth, school_year, email, hours_week} = req.body 

  //Fazer uma autenticação
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("ERROR, FAVOR PREENCHER TODOS OS CAMPOS!") 
    } 
  } 

  //Modificar os valores das variáveis
  //para formatação de Datas
  birth = Date.parse(birth) 

  //Determinar variável para identificação
  //de um objeto específico
  let id = 1 
  const lastId = data.students[data.students.length - 1] 
  if (lastId) {id = lastId.id + 1} 

  //Adicionar valores no req.body => [{...}, {...}]
  data.students.push({
    avatar_url,
    name,
    birth,
    school_year,
    email,
    hours_week,
    id
  }) 

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) {return res.send("ERRO AO ESCREVER O ARQUIVO!")} 
  }) 

  return res.redirect("students") 
} 

exports.show = function(req, res)  {
  const {id} = req.params

  const foundIdstudents = data.students.find(function(students) {
    return students.id == id 
  }) 
  if (!foundIdstudents) {return res.send("student NOT FOUND!")} 

  const student = {
    ...foundIdstudents, //spread
    age: age(foundIdstudents.birth),
    disciplines: foundIdstudents.disciplines.split(","),
    create_at: date(foundIdstudents.create_at),
    academic_level: academic_level(foundIdstudents.academic_level)
  } 

  return res.render("students/show", {student}) 
} 

exports.edit = function(req, res)  {
  const {id} = req.params 

  const foundIdstudents = data.students.find(function(students) {
    return students.id == id 
  }) 
  if (!foundIdstudents) {return res.send("student NOT FOUND!")} 

  const student = {
    ...foundIdstudents,
    birth: dateBirth(foundIdstudents.birth)
  } 

  return res.render("students/edit", {student}) 
} 

exports.update = function(req, res) {
  const {id} = req.body 
  let index = 0 

  const foundIdstudents = data.students.find(function(student, foundIndex) {
    if (id == student.id) {
      index = foundIndex 
      return true
    } 
  }) 

  if (!foundIdstudents) {return res.send("student NOT FOUND!")} 

  const student = {
    ...foundIdstudents,
    ... req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  } 

  data.students[index] = student 

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) {return res.send("ERRO AO EDITAR O ARQUIVO!")} 

    return res.redirect(`students/${id}`) 
  }) 
} 

exports.delete = function(req, res) {
  const {id} = req.body 

  const filterIdstudent = data.students.filter(function(student) {
    if (student.id != id) {return true} 
  }) 

  data.students = filterIdstudent 

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) {return res.send("ERRO AO DELETAR O ARQUIVO!")} 

    return res.redirect("students") 
  }) 
} 
