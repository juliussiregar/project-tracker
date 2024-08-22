import { PrismaClient, Status } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) }
  });
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { name, status, weight, projectId } = req.body;
  const newTask = await prisma.task.create({
    data: { name, status, weight, projectId }
  });
  await updateProjectProgress(projectId); 
  res.json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, weight } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { name, status, weight }
  });

  await updateProjectProgress(task.projectId); // Update project progress

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: { id: Number(id) }
  });
  await updateProjectProgress(task.projectId); // Update project progress
  res.json({ message: "Task deleted" });
};

const updateProjectProgress = async (projectId: number) => {
    const tasks = await prisma.task.findMany({
      where: { projectId }
    });
  
    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    const completedWeight = tasks.filter(task => task.status === 'DONE')
                                  .reduce((sum, task) => sum + task.weight, 0);
  
    const progress = totalWeight ? (completedWeight / totalWeight) * 100 : 0;
  
    let status: Status = Status.DRAFT;
    if (completedWeight > 0 && completedWeight < totalWeight) {
      status = Status.IN_PROGRESS;
    } else if (completedWeight === totalWeight) {
      status = Status.DONE;
    }
  
    await prisma.project.update({
      where: { id: projectId },
      data: { progress, status }
    });
  };

  export const getTasksByProjectId = async (req: Request, res: Response) => {
    const { projectId } = req.params;
  
    try {
      const tasks = await prisma.task.findMany({
        where: { projectId: Number(projectId) }
      });
  
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this project' });
      }
  
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
