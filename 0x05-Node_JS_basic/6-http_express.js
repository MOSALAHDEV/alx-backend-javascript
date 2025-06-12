const express = require('express');

const app = express();
const port = 1245;

// Define a route for the root path (/)
app.get('/', (request, response) => {
  response.send('Hello Holberton School!');
});

// Make the server listen on port 1245 and log when it's running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

