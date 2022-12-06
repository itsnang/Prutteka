const express = require('express');

const app = express();

app.get('/api/v1/message', (req, res) => {
  res.json('Hello from server');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});
