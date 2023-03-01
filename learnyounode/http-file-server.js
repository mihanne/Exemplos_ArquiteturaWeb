const http = require('http');
const fs = require('fs');
const port = process.argv[2];
const fileName = process.argv[3];

const server = http.createServer((req, res) => {
    fs.createReadStream(process.argv[3]).pipe(res)
})
server.listen(port);