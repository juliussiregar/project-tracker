import express from 'express';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', projectRoutes);
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
