const fn = require('./mymodule.js')
const dir = process.argv[2]
const str = process.argv[3]

fn(dir, str, function (err, data) {
    if (err) {
        throw err;
    }

    data.forEach(function (file) {
        console.log(file)
    })
})