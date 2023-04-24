import express, { Response, Request } from 'express';
import cors from 'cors';

// middleware
import ErrorHandlerMiddleware from './middlewares/error-handler';
import NotFoundMiddleware from './middlewares/not-found';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from './routes/user.routes';
import eventRoutes from './routes/event.routes';
import authRoutes from './routes/auth.routes';

app.get('/api/v1/message', (req: Request, res: Response) => {
  res.json('Hello from server');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1', authRoutes);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

export default app;
