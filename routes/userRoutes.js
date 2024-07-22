// routes/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const {
  signup,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
= require('../controllers/userController');
const router = express.Router();
userRouter.route('/signup')
    .post(signup)
userRouter.route('/')
    .get(getAllUsers)
userRouter.route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);
module.exports = userRouter;
