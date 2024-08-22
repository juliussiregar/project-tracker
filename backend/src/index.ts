import express from 'express';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));


app.use('/api', projectRoutes);
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
