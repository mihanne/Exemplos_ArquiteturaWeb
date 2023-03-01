const port = Number(process.argv[2])
const net = require('net');

const addZero = (n) => {
    return (n < 10 ? '0' : '') + n
}

const server = net.createServer((socket) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let showDate = `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}\n`

    socket.write(showDate)
    socket.end();
});

server.listen(port);