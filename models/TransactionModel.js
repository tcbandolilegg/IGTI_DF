const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    //Valida se o lançamento inserida é menor que zero
    validate(value) {
      if (value < 0) throw new Error('Valor negativo para o lançamento');
    },
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    //Valida se o ano inserida e' menor que zero
    validate(year) {
      if (year < 0) throw new Error('Valor negativo para ano');
    },
  },
  month: {
    type: Number,
    required: true,
    //Valida se o mes inserida e' menor que zero
    validate(month) {
      if (month < 0) throw new Error('Valor negativo para mes');
    },
  },
  day: {
    type: Number,
    required: true,
    //Valida se o dia inserida e' menor que zero
    validate(day) {
      if (day < 0) throw new Error('Valor negativo para dia');
    },
  },
  yearMonth: {
    type: String,
    required: true,
  },
  yearMonthDay: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// lastModified: {
//   type: Date,
//   default: Date.now,
// },
const TransactionModel = mongoose.model('transactions', schema, 'transactions');

module.exports = TransactionModel;