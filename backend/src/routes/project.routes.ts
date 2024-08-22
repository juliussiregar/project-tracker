import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/project.controller';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
