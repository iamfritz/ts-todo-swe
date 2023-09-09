import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import statusRoutes from './routes/status.routes';
import taskRoutes from './routes/task.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';

const dbConnect = require("./db/dbConnect");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Cache-Control, Authorization");
    next();
});

// Middleware
app.use(express.json());

// Routes
app.use('/', statusRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
