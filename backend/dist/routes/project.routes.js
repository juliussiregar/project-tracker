"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
const router = express_1.default.Router();
router.get('/projects', project_controller_1.getProjects);
router.get('/projects/:id', project_controller_1.getProjectById);
router.post('/projects', project_controller_1.createProject);
router.put('/projects/:id', project_controller_1.updateProject);
router.delete('/projects/:id', project_controller_1.deleteProject);
exports.default = router;
