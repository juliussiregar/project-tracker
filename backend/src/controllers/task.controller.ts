import { PrismaClient, Status } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTasksByProjectId = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const tasks = await prisma.task.findMany({
    where: { projectId: Number(projectId) },
  });
  res.status(200).json({ ok: true, data: tasks });
};

export const createTask = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { name, status, weight } = req.body;

  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  if (!project) {
    return res.status(400).json({ ok: false, error: "Project not found" });
  }

  // Validasi total weight
  const existingTasks = await prisma.task.findMany({
    where: { projectId: Number(projectId) },
  });
  const totalWeight = existingTasks.reduce((sum, task) => sum + task.weight, 0) + weight;

  if (totalWeight > 100) {
    return res.status(400).json({ ok: false, error: "Total task weight exceeds 100" });
  }

  try {
    const newTask = await prisma.task.create({
      data: { name, status, weight, projectId: Number(projectId) },
    });

    // Update project progress dan status
    await updateProjectProgress(Number(projectId), status);
    res.status(200).json({ ok: true, data: newTask });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, weight } = req.body;

  const existingTask = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!existingTask) {
    return res.status(400).json({ ok: false, error: "Task not found" });
  }

  const projectId = existingTask.projectId;

  // Validasi total weight 
  const existingTasks = await prisma.task.findMany({
    where: { projectId },
  });

  const totalWeight = existingTasks.reduce((sum, task) => {
    return task.id === Number(id) ? sum + weight : sum + task.weight;
  }, 0);

  if (totalWeight > 100) {
    return res.status(400).json({ ok: false, error: "Total task weight exceeds 100" });
  }

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { name, status, weight },
    });

    // Update project progress dan status
    await updateProjectProgress(task.projectId, status);
    res.status(200).json({ ok: true, data: task });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.delete({
      where: { id: Number(id) },
    });

    await updateProjectProgress(task.projectId);
    res.status(200).json({ ok: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Failed to delete task' });
  }
};

// Helper untuk update project progress
const updateProjectProgress = async (projectId: number, newTaskStatus?: Status) => {
  const tasks = await prisma.task.findMany({
    where: { projectId },
  });

  const completedWeight = tasks
    .filter((task) => task.status === 'DONE')
    .reduce((sum, task) => sum + task.weight, 0);

  const progress = completedWeight;

  let status: Status = 'DRAFT';

  if (progress === 100) {
    status = 'DONE';
  } else if (newTaskStatus === 'IN_PROGRESS' || tasks.some(task => task.status === 'IN_PROGRESS')) {
    status = 'IN_PROGRESS';
  } else if (progress > 0 && progress < 100) {
    status = 'IN_PROGRESS';
  }

  await prisma.project.update({
    where: { id: projectId },
    data: { progress, status },
  });
};
