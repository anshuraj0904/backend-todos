const mongoose = require('mongoose');

// Schema for Subtodo
const subtodoSchema = new mongoose.Schema({
  todoId: { type: Number, required: true },  // The `id` of the associated todo
  subtodoId: {type: Number, required:true },
  title: { type: String, required: true },  // Subtask title
  completed: { type: Boolean, default: false },  // Subtask status
});

module.exports = mongoose.model('Subtodo', subtodoSchema);
