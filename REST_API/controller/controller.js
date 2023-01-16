const getAllTodosController = async (req, res) => {
    try{
        const todos = await getAllTodos();
        res.send(todos);
    }catch(err){
        console.log(err)
    } 
};

const insertTodoController = async (req, res) => {
  const result = await insertOneTodo(req.body);
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
};

const updateTodoByIdController = async (req, res) => {
  const result = await addTodoFields(req.params.id, req.body);
  res.json({ body: req.body, update: result });
};

const deleteByIdController = async (req, res) => {
  const result = await deleteTodo(req.params.id);
  console.log(result);
  res.json({ delete: result });
};

const markAllDoneController = async (req, res) => {
    const result = await markAllTodosDone();
    res.json({ done: result.modifiedCount });
  }
