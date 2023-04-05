const mongoose = require('mongoose')
const Person = mongoose.model('Person', {
  nome: String,
  salario: Number,
  aprovado: Boolean,
})
module.exports = Person