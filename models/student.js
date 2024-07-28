const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

class Student extends Model {}

Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'instructor', 'admin'),
    allowNull: false,
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  token: {
    type: DataTypes.STRING, // Adjust type if needed
    allowNull: true, // Change to false if token is required
  },
  profilePicture: { // Add this new field
    type: DataTypes.STRING,
    allowNull: true, // Allow null if profile picture is optional
    defaultValue: 'uploads/profile.png'
  },

}, {
  sequelize,
  modelName: 'Student',
  tableName: 'students',
  timestamps: true,
  // hooks: {
  //   beforeCreate: async (student) => {
  //     if (student.password) {
  //       const salt = await bcrypt.genSalt(10);
  //       student.password = await bcrypt.hash(student.password, salt);
  //     }
  //   },
  //   beforeUpdate: async (student) => {
  //     if (student.password) {
  //       const salt = await bcrypt.genSalt(10);
  //       student.password = await bcrypt.hash(student.password, salt);
  //     }
  //   },
  // },
});

module.exports = Student;
