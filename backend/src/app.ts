import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

// Importing routes;
import AuthRoutes from './routes/auth.routes';
import TaskRoutes from './routes/tasks.routes';

// App Settings
const app : Application = express();
app.set('PORT', process.env.PORT || 3000);

// Middlewares

app.use(morgan('dev', { skip: (req : any, res : any) => process.env.NODE_ENV === 'test'}));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cors());

// Routes
app.use('/api/1.0/auth', AuthRoutes);
app.use('/api/1.0/tasks', TaskRoutes);

// Error Handler


console.log('Env: ', process.env.NODE_ENV);

export default app;