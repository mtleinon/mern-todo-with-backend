const mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});

module.exports = Todo = mongoose.model('Todo', TodoSchema);
