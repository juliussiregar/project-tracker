"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', project_routes_1.default);
app.use('/api', task_routes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
