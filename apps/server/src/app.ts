import express, { Response, Request } from 'express';
import cors from 'cors';

// middleware
import ErrorHandlerMiddleware from './middlewares/error-handler';
import NotFoundMiddleware from './middlewares/not-found';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/message', (req: Request, res: Response) => {
  res.json('Hello from server please workssss');
});

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

export default app;
