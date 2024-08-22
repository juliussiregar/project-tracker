import express from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask, getTasksByProjectId } from '../controllers/task.controller';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/projects/:projectId/tasks', getTasksByProjectId);


export default router;
