// routes/userRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/verifyToken');
const userRouter = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file',file);
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const ex = file.mimetype.split('/')[1];
    console.log('ext',ex);
    const filename = req.body.firstname + ' ' +Date.now()+'.'+ex
    cb(null, filename); // Rename file
  }
});
//file filter 
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error('Only images are allowed.'));
  }
}

const upload = multer({ 
    storage: storage,
    fileFilter:fileFilter ,
 });

const {
  signup,
  signin,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
//   uploadProfilePicture,
} = require('../controllers/userController');

userRouter.route('/signup')
  .post(upload.single('profilePicture'), signup);

userRouter.route('/signin')
  .post(signin);

userRouter.route('/')
  .get(verifyToken, getAllStudents);

userRouter.route('/:id')
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent);

// userRouter.route('/profilepicture/:id')
//   .post(upload.single('profilePicture'), uploadProfilePicture);

module.exports = userRouter;