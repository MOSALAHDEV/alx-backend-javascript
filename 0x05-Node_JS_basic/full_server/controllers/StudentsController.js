// full_server/controllers/StudentsController.js
import { readDatabase } from '../utils';

export class StudentsController {
  static getAllStudents(req, res) {
    const fileName = req.query.db;
    if (!fileName) {
      return res.status(400).send('Database path is required');
    }

    readDatabase(fileName)
      .then((students) => {
        let output = 'This is the list of our students\n';
        Object.keys(students).sort((a, b) => a.localeCompare(b)).forEach((field) => {
          output += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
        });
        res.status(200).send(output);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const fileName = req.query.db;
    const major = req.params.major;
    if (!fileName) {
      return res.status(400).send('Database path is required');
    }

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(fileName)
      .then((students) => {
        const fieldStudents = students[major] || [];
        res.status(200).send(`List: ${fieldStudents.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

