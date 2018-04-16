const mongoose = require('mongoose');

const { Schema } = mongoose;

const IdentifierSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'CPF',
      'CNPJ',
    ],
  },
  blacklist: {
    type: Boolean,
    default: false,
  },
}, {
  createdAt: true,
  updatedAt: true,
});

const Identifier = mongoose.model('Identifier', IdentifierSchema);

module.exports = Identifier;
