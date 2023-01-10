import { connDB, getAllTodos, insertOneTodo } from './database.js';
import express  from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connDB();

const getTodos = async () => {
  let result = await getAllTodos();
  console.log(result);
};
const insertTodo = async () => {
  const todo = {
    title: 'todo 3',
    done: false,
    notes: '',
    date: '',
    priority: 'none',
    deleted: false
  };
  await insertOneTodo(todo);
};
//getTodos();
insertTodo();
