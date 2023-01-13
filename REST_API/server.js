import express from 'express';
import cors from 'cors';
import {
  addTodoFields,
  deleteTodo,
  getAllTodos,
  insertOneTodo,
  markAllTodosDone,
  updateTodo
} from './model/database.js';
import { isEmptyObject } from './utility.js';

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', async (req, res) => {
  const todos = await getAllTodos();
  if (isEmptyObject(todos)) res;
  res.send(todos);
});

app.post('/insert', async (req, res) => {
  const result = await insertOneTodo(req.body);
  if (result.message) {
    res.status(200).json({ 
      body: req.body, 
      message: result 
    });
  } else {
    result.message = 'No Body Sent'
    res.status(400).json({ 
      body: req.body, 
      message: result });
  }
});
app.put('/updates',async (req,res)=>{
  const result =  await updateTodo(req.body);
  if (result.message) {
    res.status(200).json({ 
      body: req.body, 
      message: result 
    });
  } else {
    result.message = 'No Body Sent'
    res.status(400).json({ 
      body: req.body, 
      message: result });
  }
})

app.put('/update/:id', async (req, res) => {
  const result = await addTodoFields(req.params.id, req.body);
  res.json({ body: req.body, update: result });
});

app.delete('/delete/:id', async (req, res) => {
  const result = await deleteTodo(req.params.id);
  console.log(result);
  res.json({ delete: result });
});
app.put('/done', async (req, res) => {
  const result = await markAllTodosDone();
  res.json({ done: result.modifiedCount });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
