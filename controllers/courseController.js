const Course = require('../models/course');

const asyncHandler = require('../middleware/errorHandler'); // Adjust path as needed

console.log('Course model loaded successfully ')


const getAllCourses = async (req, res) => {
  console.log('getAllCourses');
  try {
    const courses = await Course.findAll();
    res.json({
      status: 'success',
      data: courses
    });
  } catch (error) {
    console.log('Error getting courses:');
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


const getCourseById = async (req, res) => {
  console.log('getCourseById');
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.json({
        status: 'success',
        data: course
      });
    } else {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'Course not found'
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


const addCourse = async (req, res) => {
  console.log('addCourse');
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


const updateCourse = async (req, res) => {
  console.log('updateCourse');
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.update(req.body);
      res.json({
        status: 'success',
        data: course
      });
    } else {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'Course not found'
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const deleteCourse = async (req, res) => {
  console.log('deleteCourse');
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.json({
        status: 'success',
        data: {
          message: 'Course deleted'
        }
      });
    } else {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'Course not found'
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
