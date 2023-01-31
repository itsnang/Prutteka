import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.cwd() +
    (process.env.NODE_ENV === 'development' ? '/.env.local' : '/.env'),
});

import app from './app';
import http from 'http';

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    server.listen(PORT, () => {
      console.log('Server is running on port:', PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();
