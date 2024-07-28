// routes/userRoutes.js
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const userRouter = express.Router();
const multer = require('multer');
// Configure multer
// Set up multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    }
  });
const upload = multer({ storage: storage });

const {
  signup,
  signin,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  uploadProfilePicture,
}
= require('../controllers/userController');
const router = express.Router();
 userRouter.route('/signup')
     .post(upload.single('profilePicture'),signup)
userRouter.route('/signin')
    .post(signin)
userRouter.route('/')
    .get(verifyToken,getAllStudents)
userRouter.route('/:id')
    .get(getStudentById)
    .patch(updateStudent)
    .delete(deleteStudent);
// userRouter.route('/profilepicture/:id')
//     .post(upload.single('profilePicture'),uploadProfilePicture);

module.exports = userRouter;
