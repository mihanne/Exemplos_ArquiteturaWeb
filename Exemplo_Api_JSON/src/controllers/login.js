module.exports.index = function(application, req, res) {
    var loginModel = new application.src.models.login();
  
    loginModel.getLogin(function(err, result) {
      res.render("login/index", {login : result});
    });
  }