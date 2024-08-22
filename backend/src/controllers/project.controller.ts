import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: { tasks: true }
  });
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: { tasks: true }
  });
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { name, status, progress } = req.body;
  const newProject = await prisma.project.create({
    data: { name, status, progress }
  });
  res.json(newProject);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: { name, status }
  });

  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id: Number(id) } });
  res.json({ message: "Project deleted" });
};
