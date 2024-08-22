import { PrismaClient, Status } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: { tasks: true },
  });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newProject = await prisma.project.create({
    data: { name },
  });
  res.json(newProject);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: { name },
  });

  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id: Number(id) } });
  res.json({ message: 'Project deleted' });
};