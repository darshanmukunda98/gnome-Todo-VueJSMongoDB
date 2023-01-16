import express  from 'express';
import {
  getAllTodosController,
  insertTodoController,
  updateTodoByIdController,
  deleteByIdController,
  markAllDoneController
} from '../controller/controller.js';


const router = express.Router();

router.get('/', getAllTodosController);

router.post('/', insertTodoController);

router.put('/:id', updateTodoByIdController);

router.delete('/:id', deleteByIdController);

router.put('/done', markAllDoneController);

export default router;

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
