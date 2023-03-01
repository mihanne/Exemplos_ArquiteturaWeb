const fs = require('fs')
const path = require('path')

module.exports = function (dir, str, callback) {
    fs.readdir(dir, function (err, data) {
        if (err) {
            return callback(err)
        }
        data = data.filter(function (file) {
            return path.extname(file) === '.' + str
        })
        callback(null, data)
    })
}