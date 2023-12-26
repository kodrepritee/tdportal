import Todo from "./models/todo.js";

const resolvers = {
  Query:{
    getTodos: async () => {
      const todos = await Todo.find();
      return todos
    },
    getTodo: async (root, args) => {
      const todo = await Todo.findById(args.id);
      return todo
    }
  },
  Mutation:{
    addTodo:async(root, args) => {
      const newTodo = new Todo({title:args.title, details:args.details, date:args.date});
      await newTodo.save();
      return newTodo
    },
    deleteTodo:async(root, args) => {
      try {
        await Todo.findByIdAndDelete(args.id);
        return "to do list deleted successfully"
      } catch (err) {
        console.log(err);
        return err.message
      }
    },
    updateTodo:async(root, args) => {
      try {
        const {id, title, details, date} = args;
        const updatedTodo = {};
        if (title!=undefined) {
          updatedTodo.title = title;
        }
        if (details!=undefined) {
          updatedTodo.details = details;
        } 
        if (date!=undefined) {
          updatedTodo.date = date;
        }

        const todo = await Todo.findByIdAndUpdate(id, updatedTodo, {new: true});
        return todo
      } catch (err) {
        console.log(err);
        return err.message
      }
    }
  }
}
export default resolvers;