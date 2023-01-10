import { connDB, getAllTodos } from './database.js';

connDB();

const getTodos = async () => {
  let result = await getAllTodos();
  console.log(result);
};
getTodos();
