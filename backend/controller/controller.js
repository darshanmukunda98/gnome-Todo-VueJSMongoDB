import {
  getAllTodos,
  insertOneTodo,
  addTodoFields,
  deleteTodo,
  markAllTodosDone
} from '../model/database.js';

export const getAllTodosController = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(rename_idToid(todos));
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

export const insertTodoController = async (req, res) => {
  try {
    const result = await insertOneTodo(req.body);
    res.json(rename_idToid(result))
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

export const updateTodoByIdController = async (req, res) => {
  try {
    const result = await addTodoFields(req.params.id, req.body);
    res.json(rename_idToid(result));
  } catch (err) {
    console.log(err);
    //next(err)
    throw new Error(err)
    res.status(400).json(err);
    
  }
};

export const deleteByIdController = async (req, res) => {
  const result = await deleteTodo(req.params.id);
  console.log(result);
  res.json({ delete: result });
};

export const markAllDoneController = async (req, res) => {
  const result = await markAllTodosDone();
  res.json({ done: result.modifiedCount });
};
