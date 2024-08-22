import { Router } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';

const router = Router();

// Project Routes
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);


export default router;
