import express, { Response, Request } from 'express';

const app = express();

app.get('/api/v1/message', (req: Request, res: Response) => {
  res.json('Hello from server please workssss');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});
