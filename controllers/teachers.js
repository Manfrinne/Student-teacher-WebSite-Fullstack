
const fs = require('fs');
const data = require('../data.json');

exports.redirect = function(req, res) {
  return res.redirect("teachers");
};

exports.index = function(req, res) {
  return res.render("teachers/index");
};

exports.create = function(req, res) {
  return res.render("teachers/create");
};

exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  let {avatar_url, name, birth, academic_level, class_type, disciplines, create_at, id} = req.body;

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("ERROR, FAVOR PREENCHER TODOS OS CAMPOS!");
    };
  };

  create_at = Date.now(create_at);
  birth = Date.parse(birth);
  id = Number(data.teachers.length + 1);

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
