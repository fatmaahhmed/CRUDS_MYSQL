// controllers/StudentController.js
const multer = require('multer');
const path = require('path');
const Student  = require('../models/student');
const asyncHandler = require('../middleware/errorHandler');
const HttpStatus = require('../utils/httpStatus');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const comparePassword = async (userInputPassword, storedHashedPassword) => {
  try {
      const result = await bcrypt.compare(userInputPassword, storedHashedPassword);
      if (result) {
          // Passwords match, authentication successful
          console.log('Passwords match! User authenticated.');
      } else {
          // Passwords don't match, authentication failed
          console.log('Passwords do not match! Authentication failed.');
      }
  } catch (err) {
      // Handle error
      console.error('Error comparing passwords:', err);
  }
};
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role:user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Configure multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads')); // Absolute path to 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const uploadProfilePicture=asyncHandler(async (req, res) => { 
  console.log('upload profile picture');
  
  const studentId = parseInt(req.body.id);
  console.log('upload profile picture',studentId);
  const file = req.file;
  console.log('file----------->',file);
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('upload profile picture successful');
  // You may want to save the file path or URL in the database
  const profilePictureUrl = `/${file.path}`;
  // Update student record with the profile picture URL

  await Student.update(
    { profilePicture: profilePictureUrl },
    { where: { id: studentId } }
  );
  console.log('----------------------------------------------------');
});
const signup = asyncHandler(async (req, res) => {
  try {

    // Validate input
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      });
    }
    // Check if student with the given email already exists
    let student = await Student.findOne({ where: { email } });
    if (student) {
      console.log('Email already exists')
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists',
      });
    }

    console.log('Creating a new student record');
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student record
    student = await Student.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log('student created');
    // Generate JWT token using the utility function
    const token = generateToken(student);
    console.log('jwt: ', token);
    // Update student record with token
    student.token = token;
    await student.save();
    console.log('student saved');
    // Send success response
    res.status(201).json({
      status: 'success',
      data: student,
    });
    id= student.id;
    uploadProfilePicture(req,res);
    
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});


const signin = asyncHandler(async (req, res) => {
  console.log('signin successful');
  console.log('----------------------------------------------------');
  console.log('req.body: ', req.body.email);
  console.log('----------------------------------------------------');

  // Check if student with the given email exists
  const student = await Student.findOne({ where: { email: req.body.email } });
  if (student) {
    const isPasswordMatch = await bcrypt.compare(req.body.password, student.password);
    if (isPasswordMatch) {
      const token = generateToken(student);
      console.log('jwt: ', token);
      student.token = token;
      await student.save();
      res.status(200).json({
        status: 'success',
        data: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          role: student.role,
          token: token
        },
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid password',
      });
    }
  } else {
    // Send error response for email not found
    res.status(404).json({
      status: 'fail',
      message: 'Email not found',
    });
  }
});
const getAllStudents = asyncHandler(async (req, res) => {
  console.log('getAllStudents');
  const page = req.query.page || 1;
  const pageSize = req.query.limit || 5;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);
  const { count, rows: student } = await Student.findAndCountAll({
    offset,
    limit,
  });
  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'Student fetched successfully',
    data: {
      student,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    },
  });
});
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (student) {
    res.json({
      status: 'success',
      data: student,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Student not found',
    });
  }
});
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByPk(req.params.id);

  if (student) {
    await student.update(req.body);
    res.json({
      status: 'success',
      data: student,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Student not found',
    });
  }
});
const deleteStudent = asyncHandler(async (req, res) => {
  //check if the student is admin or not
  const isadmin= await Student.findOne({ where: { email: req.body.email } });
  if(isadmin.role ==='admin'){
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
      res.json({
        status: 'success',
        message: 'Student deleted',
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Student not found',
      });
    }}
  else{
    res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to delete this student',
    });
  }
});

module.exports = {
  signup,
  signin,

  uploadProfilePicture,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
