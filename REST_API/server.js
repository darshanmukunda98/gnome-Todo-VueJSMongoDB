import express from 'express';
import { getAllTodos, insertOneTodo } from './model/database.js';

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
    const todo = await insertOneTodo(req.body);
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
