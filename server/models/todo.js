import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;
const todoSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  details: String,
  date: Date
}, {timestamps: true})

const Todo = mongoose.model('todo', todoSchema);

export default Todo;