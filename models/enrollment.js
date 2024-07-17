// models/enrollment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Course = require('./course');

const Enrollment = sequelize.define('Enrollment', {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('enrolled', 'completed', 'dropped'),
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING(2),
  }
});

module.exports = Enrollment;
