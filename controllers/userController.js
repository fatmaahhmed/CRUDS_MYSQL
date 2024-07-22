// controllers/userController.js
const asyncHandler = require('express-async-handler');
// const User = require('../models/user.js');
const asyncHandler = require('../middleware/errorHandler');
const { getPagination, getPagingData } = require('../utils/pagination');

//m7taga a3ml validation 3la goz2 ql registrations da 
const signup =  asyncHandler(async(req,res)=>{
  console.log('signup successful');
  console.log('req.body: '+req.body);
  const user = await User.create(req.body);
  res.status(201).json({
    status:'success',
    data: user,
  });
})

const getAllUsers = asyncHandler(async (req, res) => {
  console.log('getAllUsers');
  // const { page = 1, pageSize = 5 } = req.query;
  // const { limit, offset } = getPagination(page, pageSize);

  // const data = await User.findAndCountAll({ limit, offset });
  // const response = getPagingData(data, page, limit);
  // res.json({
  //   status: 'success',
  //   data: response,
  // });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json({
      status: 'success',
      data: user,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
});

const addUser = asyncHandler(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json({
      status: 'success',
      data: user,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({
      status: 'success',
      message: 'User deleted',
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
});

module.exports = {
  signup,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
