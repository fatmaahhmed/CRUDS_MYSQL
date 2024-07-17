const { Course } = require('../models');
const asyncHandler = require('../middleware/errorHandler');   
const HttpStatus = require('../utils/httpStatus.js');



const getAllCourses = asyncHandler(async (req, res) => {

  //http://127.0.0.1:3030/api/courses?page=1&limit=5

  console.log('getAllCourses');
  const page = req.query.page || 1;
  const pageSize = req.query.limit || 5;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  const { count, rows: courses } = await Course.findAndCountAll({
    offset,
    limit,
  });


  res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'Courses fetched successfully',
    data: {
      courses,
    },
  });
});
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Course fetched successfully',
      data: course,
    });
  } else {
    res.status(HttpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Course not found',
      data: null,
    });
  }
});
const addCourse = asyncHandler(async (req, res) => {
  console.log('addCourse');
  console.log(req.body)
  const newCourse = await Course.create(req.body);

  console.log(newCourse)
  res.status(HttpStatus.CREATED).json({
    status: 'success',
    message: 'Course added successfully',
    data: newCourse,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.update(req.body);
    res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Course updated successfully',
      data: course,
    });
  } else {
    res.status(HttpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Course not found',
      data: null,
    });
  }
});
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    res.status(HttpStatus.NO_CONTENT).json({
      status: 'success',
      message: 'Course deleted successfully',
      data: null,
    });
  } else {
    res.status(HttpStatus.NOT_FOUND).json({
      status: 'fail',
      message: 'Course not found',
      data: null,
    });
  }
});

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
//Cruds operations 