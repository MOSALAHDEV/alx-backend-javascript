const express = require('express');
const { readFile } = require('fs');

const app = express();
const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        let output = '';
        const lines = data.toString().split('\n');
        
        // Loop over lines to process students
        for (let i = 1; i < lines.length; i += 1) { // Skip header
          if (lines[i]) {
            length += 1;
            const field = lines[i].toString().split(',');
            const studentName = field[0];
            const studentField = field[3];

            // Collect students by field
            if (Object.prototype.hasOwnProperty.call(students, studentField)) {
              students[studentField].push(studentName);
            } else {
              students[studentField] = [studentName];
            }

            // Track number of students in each field
            if (Object.prototype.hasOwnProperty.call(fields, studentField)) {
              fields[studentField] += 1;
            } else {
              fields[studentField] = 1;
            }
          }
        }

        const l = length;
        output += `Number of students: ${l}\n`;

        // Format output for each field
        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'field') {
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${students[key].join(', ')}\n`;
          }
        }
        resolve(output);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbPath = req.query.db;

  if (!dbPath) {
    res.status(400).send('Database path is required');
    return;
  }

  countStudents(dbPath)
    .then((output) => {
      res.send(['This is the list of our students', output].join('\n'));
    })
    .catch((err) => {
      res.status(500).send('This is the list of our students\n' + err.message);
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

