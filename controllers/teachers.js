
const fs = require('fs');
const data = require('../data.json');
const {age, date, academic_level, dateBirth} = require('../utils.js');

exports.redirect = function(req, res) {
  return res.redirect("teachers");
};

exports.index = function(req, res) {
  return res.render("teachers/index", {teachers: data.teachers});
};

exports.create = function(req, res) {
  return res.render("teachers/create");
};

exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  let {avatar_url, name, birth, academic_level, class_type, disciplines, create_at} = req.body;

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("ERROR, FAVOR PREENCHER TODOS OS CAMPOS!");
    };
  };

  birth = Date.parse(birth);
  create_at = Date.now();
  let id = 1;
  const lastId = data.teachers[data.teachers.length - 1];
  if (lastId) {id = lastId.id + 1};

  data.teachers.push({
    avatar_url,
    name,
    birth,
    academic_level,
    class_type,
    disciplines,
    create_at,
    id,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) {return res.send("ERRO AO ESCREVER O ARQUIVO!")};
  });

  return res.redirect("teachers");
};

exports.show = function(req, res)  {
  const {id} = req.params;

  const foundIdTeachers = data.teachers.find(function(teachers) {
    return teachers.id == id;
  });
  if (!foundIdTeachers) {return res.send("TEACHER NOT FOUND!")};

  const teacher = {
    ...foundIdTeachers,
    age: age(foundIdTeachers.birth),
    disciplines: foundIdTeachers.disciplines.split(","),
    create_at: date(foundIdTeachers.create_at),
    academic_level: academic_level(foundIdTeachers.academic_level)
  };

  return res.render("teachers/show", {teacher});
};

exports.edit = function(req, res)  {
  const {id} = req.params;

  const foundIdTeachers = data.teachers.find(function(teachers) {
    return teachers.id == id;
  });
  if (!foundIdTeachers) {return res.send("TEACHER NOT FOUND!")};

  const teacher = {
    ...foundIdTeachers,
    birth: dateBirth(foundIdTeachers.birth)
  };

  return res.render("teachers/edit", {teacher});
};

exports.update = function(req, res) {
  const {id} = req.body;
  let index = 0;

  const foundIdTeachers = data.teachers.find(function(teacher, foundIndex) {
    if (id == teacher.id) {
      index = foundIndex;
      return true
    };
  });

  if (!foundIdTeachers) {return res.send("TEACHER NOT FOUND!")};

  const teacher = {
    ...foundIdTeachers,
    ... req.body,
    birth: dateBirth(foundIdTeachers.birth)
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) {return res.send("ERRO AO EDITAR O ARQUIVO!")};

    return res.redirect(`teachers/${id}`);
  });
};

