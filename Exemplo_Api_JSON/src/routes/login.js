module.exports = function(application){
    application.get('/', function(req, res){
      application.src.controllers.login.index(application, req, res);
    });
  }