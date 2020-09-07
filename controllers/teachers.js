
const fs = require('fs');

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
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("ERROR, FAVOR PREENCHER TODOS OS CAMPOS!");
    };
  };

  fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
    if (err) {return res.send("ERRO AO ESCREVER O ARQUIVO!")};
  });

  return res.redirect("teachers");
};
