/*
server.js

    importou o módulo fs e "promisificou" 
    a função fs.stat
*/
const express = require('express')
    , app = express()
    , fs = require('fs')
    , getStat = require('util').promisify(fs.stat);

app.use(express.static('public'));

// 5519KB // aproximadamente 5,3 MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  64;

// callback é async agora!
app.get('/audio', async (req, res) => {

    const filePath = './audio.ogg';
    const stat = await getStat(filePath);
    console.log(stat);

    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));

    // faz streaming do audio 
    stream.pipe(res);
});

app.listen(3000, () => console.log('app is running'));