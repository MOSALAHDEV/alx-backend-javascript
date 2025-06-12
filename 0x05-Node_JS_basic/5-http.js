const http = require('http');
const fs = require('fs');

// Function to count students, similar to 3-read_file_async.js
function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }

      const lines = data.trim().split('\n');
      const students = {};
      let totalStudents = 0;

      lines.forEach((line, index) => {
        if (index === 0) return; // Skip the header line
        const [firstName, lastName, age, field] = line.split(',');

        if (!field || !firstName) return; // Skip empty lines or invalid data

        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstName);
        totalStudents++;
      });

      // Prepare the output to send back to the HTTP response
      let responseString = `Number of students: ${totalStudents}\n`;

      Object.keys(students).forEach((field) => {
        responseString += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`;
      });

      resolve(responseString);
    });
  });
}

// HTTP Server Setup
const app = http.createServer((req, res) => {
  const urlPath = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/plain');

  if (urlPath === '/') {
    // Root path - Respond with Hello ALX!
    res.end('Hello Holberton School!');
  } else if (urlPath === '/students' && method === 'GET') {
    // /students path - Respond with list of students
    const dbFilePath = process.argv[2]; // The database path passed as an argument

    if (!dbFilePath) {
      res.statusCode = 400;
      res.end('Database file not provided!');
    } else {
      countStudents(dbFilePath)
        .then((studentInfo) => {
          res.end(`This is the list of our students\n${studentInfo}`);
        })
        .catch((err) => {
          res.statusCode = 500;
          res.end(err.message);
        });
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app for testing or other purposes
module.exports = app;

