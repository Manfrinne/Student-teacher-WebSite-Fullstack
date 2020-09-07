

exports.redirect = function(req, res) {
  return res.redirect("teachers");
};

exports.index = function(req, res) {
  return res.render("teachers/index");
};

exports.create = function(req, res) {
  return res.render("teachers/create");
};
