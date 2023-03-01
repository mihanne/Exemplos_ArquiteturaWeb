const fs = require('fs')
const file = process.argv[2];
const buffer = fs.readFileSync(file).toString('utf8');
const result = buffer.split('\n').length - 1;
console.log(result);
