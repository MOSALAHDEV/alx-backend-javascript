const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Reading the file asynchronously
    const data = await fs.readFile(path, 'utf-8');
    
    // Split the data into lines and remove any empty lines
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    // Split each line by commas and store in the students array
    const students = lines.map(line => line.split(','));

    // Extract field data and group students by field
    const fields = {};

    // Skip the header and iterate over each student record
    students.slice(1).forEach(student => {
      const [firstName, lastName, age, field] = student;
      if (fields[field]) {
        fields[field].push(firstName);
      } else {
        fields[field] = [firstName];
      }
    });

    // Log the total  of students
    console.log(`Number of students: ${students.length - 1}`);

    // Log the students in  fields
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }

    // Return a resolved Promise aftr processing
    return Promise.resolve();
    
  } catch (error) {
    // If an error occurs, throw an error
    return Promise.reject(new Error('Cannot load the database'));
  }
}

module.exports = countStudents;

