const sequelize = require('./config/database');
const Student = require('./models/student');
const Course = require('./models/course');
const Enrollment = require('./models/enrollment');
const bcrypt = require('bcrypt');

async function seed() {
  



  // Seed Enrollments
  await Enrollment.bulkCreate([
    { studentId: 1, courseId: 3, enrollmentDate: new Date() },
    { studentId: 2, courseId: 8, enrollmentDate: new Date() },
    // add more enrollments as needed
  ]);
  console.log('Seed data inserted successfully');
  process.exit();
}

seed().catch(error => {
  console.error('Failed to seed data:', error);
  process.exit(1);
});
