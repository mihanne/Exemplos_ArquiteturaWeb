var app = require('http').createServer(resposta);
var fs = require('fs');
var app = require('http').createServer(resposta);
var fs = require('fs');
var io = require('socket.io')(app);

app.listen(3000);
console.log("Aplicação está em execução...");

function resposta (req, res) {
     var arquivo = "";
     if(req.url == "/"){
         arquivo = __dirname + '/index.html';
     }else{
         arquivo = __dirname + req.url;
     }
     fs.readFile(arquivo,
         function (err, data) {
              if (err) {
                   res.writeHead(404);
                   return res.end('Página ou arquivo não encontrados');
              }

              res.writeHead(200);
              res.end(data);
         }
     );
}

io.on("connection", function(socket){
    socket.on("enviar mensagem", function(mensagem_enviada, callback){
        mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + mensagem_enviada;

        io.sockets.emit("atualizar mensagens", mensagem_enviada);
        callback();
    });
});
function pegarDataAtual(){
 var dataAtual = new Date();
 var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
 var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
 var ano = dataAtual.getFullYear();
 var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
 var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
 var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();

 var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
 return dataFormatada;
}