var fs = require('fs');

function login() {}

login.prototype.getLogin = function(callback) {
  fs.readFile('./data/dados_login.json', 'utf8', function(err, result) {
    var data = [];

    if (!err) {
      
      var obj = JSON.parse(result);
      var i = 0; //(obj.pessoas.length - 1);

      obj.pessoas.forEach(function(pessoas) {
        if (i >=  0) {
          data[i] = pessoas;
	      i++;
        }
      });
    }	   
    callback(err, data);
  });
};

module.exports = function(){
  return login;
}