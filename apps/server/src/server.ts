import dotenv from 'dotenv-flow';

dotenv.config();

import app from './app';
import connectDB from './db/connect';
import http from 'http';

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    server.listen(PORT, () => {
      console.log('Server is listening on port', PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();
