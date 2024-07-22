const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
const Student = require('./student'); // Adjust the path if necessary
const Course = require('./course'); // Adjust the path if necessary

class Enrollment extends Model {}

Enrollment.init({
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'id',
    },
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
    primaryKey: true,
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Enrollment',
  tableName: 'enrollments',
  timestamps: true,
});

Student.belongsToMany(Course, { through: Enrollment, foreignKey: 'studentId' });
Course.belongsToMany(Student, { through: Enrollment, foreignKey: 'courseId' });

module.exports = Enrollment;
