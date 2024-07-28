// routes/userRoutes.js
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uplobad = multer({dest:'uploads/'})
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
