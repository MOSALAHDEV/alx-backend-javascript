const fs = require('fs').promises;

async function countStudents(path) {
  let data;
  try {
    data = await fs.readFile(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .filter((line) => line.trim() !== '');
  const students = lines.map((line) => line.split(','));
  const fields = {};

  students.slice(1).forEach((student) => {
    const [firstName, , , field] = student;
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstName);
  });

  console.log(`Number of students: ${students.length - 1}`);
  Object.entries(fields).forEach(([field, names]) => {
    console.log(
      `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
    );
  });
}

module.exports = countStudents;
