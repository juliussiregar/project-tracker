"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma.project.findMany({
        include: { tasks: true }
    });
    res.json(projects);
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield prisma.project.findUnique({
        where: { id: Number(id) },
        include: { tasks: true }
    });
    if (project) {
        res.json(project);
    }
    else {
        res.status(404).json({ error: "Project not found" });
    }
});
exports.getProjectById = getProjectById;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status, progress } = req.body;
    const newProject = yield prisma.project.create({
        data: { name, status, progress }
    });
    res.json(newProject);
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status } = req.body;
    const project = yield prisma.project.update({
        where: { id: Number(id) },
        data: { name, status }
    });
    res.json(project);
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: "Project deleted" });
});
exports.deleteProject = deleteProject;
