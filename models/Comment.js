const mongoose = require('mongoose');

const Comment = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }, 
  page: {
    type: String,
    required: true,
  },  
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', Comment,"comments");
