import express from 'express';
import {
  addTodoFields,
  deleteTodo,
  getAllTodos,
  insertOneTodo
} from './model/database.js';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

app.post('/insert', async (req, res) => {
  try {
    console.log(req.body);
    const result = await insertOneTodo(req.body);
    res.json({ body: req.body, insertion: result });
  } catch (err) {
    console.log(err);
  }
});

app.put('/update/:id', async (req, res) => {
  const result = await addTodoFields(req.params.id, req.body);
  res.json({ body: req.body, result: result });
});

app.delete('/delete/:id', async (req, res) => {
  const result = await deleteTodo(req.params.id);
  console.log(result)
  res.json({result: result });
});
app.put('/done','')

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
