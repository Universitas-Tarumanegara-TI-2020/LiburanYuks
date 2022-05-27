const { resolveInclude } = require('ejs');
const mongoose = require('mongoose');

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  access: {
    type: String,
    required: true,
    default: false,
    enum:["true","false"]
  }
});

module.exports = mongoose.model('User', user);
