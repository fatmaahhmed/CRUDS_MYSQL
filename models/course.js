const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;
