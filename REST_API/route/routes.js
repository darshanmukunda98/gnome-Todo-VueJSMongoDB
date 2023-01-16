import app from '../server.js';

app.get('/', getAllTodosController);

app.post('/insert', insertTodoController);

app.put('/update/:id', updateTodoByIdController);

app.delete('/delete/:id', deleteByIdController);

app.put('/done', markAllDoneController);

/* app.put('/updates', async (req, res) => {
  //remove this route and function
  const result = await updateAllTodos(req.body);
  if (result.message) {
    res.status(200).json({
      body: req.body,
      message: result
    });
  } else {
    result.message = 'No Body Sent';
    res.status(400).json({
      body: req.body,
      message: result
    });
  }
}); */
