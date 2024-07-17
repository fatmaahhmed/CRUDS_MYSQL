// routes/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();
userRouter.route('/')
    .get(getAllUsers)
    .post(addUser);
userRouter.route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);
module.exports = userRouter;
