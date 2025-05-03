const mongoose = require('mongoose');

// Schema for Todo
const todoSchema = new mongoose.Schema({
  id : { type: Number, unique: true, required:true },  // Numeric ID (auto-increment)
  title: { type: String, required: true },  // Todo title
  completed: { type: Boolean, default: false },  // Status of the todo
  subtodos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtodo' }]  // Reference to subtodos
});

module.exports = mongoose.model('Todo', todoSchema);
