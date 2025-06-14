const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n');
    const students = lines
      .filter((line) => line.trim() !== '')
      .map((line) => line.split(','));
    const fields = {};

    students.slice(1).forEach((student) => {
      const [firstName, , , field] = student;
      if (fields[field]) {
        fields[field].push(firstName);
      } else {
        fields[field] = [firstName];
      }
    });

    console.log(`Number of students: ${students.length - 1}`);
    Object.entries(fields).forEach(([field, names]) => {
      console.log(
        `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
      );
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
