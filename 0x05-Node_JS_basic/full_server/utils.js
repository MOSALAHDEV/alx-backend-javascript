// full_server/utils.js
import { readFile } from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject('Cannot load the database');
      } else {
        const students = {};
        const lines = data.toString().split('\n');
        lines.forEach((line) => {
          if (line) {
            const [firstname, , , field] = line.split(',');
            if (students[field]) {
              students[field].push(firstname);
            } else {
              students[field] = [firstname];
            }
          }
        });
        resolve(students);
      }
    });
  });
}

