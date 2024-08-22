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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma.task.findMany();
    res.json(tasks);
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield prisma.task.findUnique({
        where: { id: Number(id) }
    });
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ error: "Task not found" });
    }
});
exports.getTaskById = getTaskById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status, weight, projectId } = req.body;
    const newTask = yield prisma.task.create({
        data: { name, status, weight, projectId }
    });
    yield updateProjectProgress(projectId);
    res.json(newTask);
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, weight } = req.body;
    const task = yield prisma.task.update({
        where: { id: Number(id) },
        data: { name, status, weight }
    });
    yield updateProjectProgress(task.projectId); // Update project progress
    res.json(task);
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield prisma.task.delete({
        where: { id: Number(id) }
    });
    yield updateProjectProgress(task.projectId); // Update project progress
    res.json({ message: "Task deleted" });
});
exports.deleteTask = deleteTask;
const updateProjectProgress = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma.task.findMany({
        where: { projectId }
    });
    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    const completedWeight = tasks.filter(task => task.status === 'DONE')
        .reduce((sum, task) => sum + task.weight, 0);
    const progress = totalWeight ? (completedWeight / totalWeight) * 100 : 0;
    let status = client_1.Status.DRAFT;
    if (completedWeight > 0 && completedWeight < totalWeight) {
        status = client_1.Status.IN_PROGRESS;
    }
    else if (completedWeight === totalWeight) {
        status = client_1.Status.DONE;
    }
    yield prisma.project.update({
        where: { id: projectId },
        data: { progress, status }
    });
});
