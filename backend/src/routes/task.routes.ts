import { Router } from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  getTasksByProjectId
} from '../controllers/task.controller';

const router = Router();

// Task Routes
router.get('/projects/:projectId/tasks', getTasksByProjectId);
router.post('/projects/:projectId/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);


export default router;
