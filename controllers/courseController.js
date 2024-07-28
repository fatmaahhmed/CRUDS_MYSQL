const Course  = require('../models/course');
const asyncHandler = require('../middleware/errorHandler');
const HttpStatus = require('../utils/httpStatus');
const jwt=require('jsonwebtoken');
// Get all courses
const getAllCourses = asyncHandler(async (req, res) => {
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
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    },
  });
});
// Get course by ID
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
// Create a new course
const addCourse = asyncHandler(async (req, res) => {
  console.log('Add Course Success')

  
    if (Array.isArray(req.body)) {
      courses = await Course.bulkCreate(req.body);
    } else {
      // If it's a single object, create one course
      courses = await Course.create(req.body);
    }
    res.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Course(s) added successfully',
      data: courses,
    });
  }
);
// Update a course
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
// Delete a course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    console.log('course destroyed');
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
