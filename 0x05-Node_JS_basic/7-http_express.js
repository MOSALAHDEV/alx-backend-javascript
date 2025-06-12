const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 1245;

// Function to count students from the CSV file
function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        let output = '';
        const lines = data.toString().split('\n');
        
        // Skip the header and loop through lines to process students
        for (let i = 1; i < lines.length; i++) {
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

        const totalStudents = length;
        output += `Number of students: ${totalStudents}\n`;

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

// Route for the root path
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for the /students path
app.get('/students', (req, res) => {
  const dbPath = req.query.db; // Fetch the database file from the query parameter

  if (!dbPath) {
    res.status(400).send('Database path is required');
    return;
  }

  // Check if file exists
  const filePath = path.resolve(dbPath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(500).send('Cannot load the database');
      return;
    }

    // Call the function to count students from the file
    countStudents(filePath)
      .then((output) => {
        res.send(['This is the list of our students', output].join('\n'));
      })
      .catch((error) => {
        res.status(500).send('This is the list of our students\n' + error.message);
      });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

