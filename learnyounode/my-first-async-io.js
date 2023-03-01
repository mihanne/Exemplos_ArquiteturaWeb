const fs = require('fs');
const file = process.argv[2];

fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    let string = data.toString('utf8');
    let result = string.split('\n').length - 1;
    console.log(result);
})