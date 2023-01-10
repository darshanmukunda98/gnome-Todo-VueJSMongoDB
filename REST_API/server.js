import { connDB, getAllTodos, insertOneTodo } from './database.js';

connDB();

const getTodos = async () => {
  let result = await getAllTodos();
  console.log(result);
};
const insertTodo = async () =>{
    const todo = {
        title: 'todo 3',
        done: false,
        notes: '',
        date: '',
        priority: 'none',
        deleted: false
      }
    await insertOneTodo(todo)
}
//getTodos();
insertTodo()
