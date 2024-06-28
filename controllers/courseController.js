const Course = require('../models/courses'); // تأكد من تعديل المسار حسب الحاجة
const asyncHandler = require('../middleware/errorHandler'); // تأكد من تعديل المسار حسب الحاجة

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll();
  res.json({ status: 'success', data: { courses } });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    res.json({ status: 'success', data: { course } });
  } else {
    res.status(404).json({ status: 'fail', message: 'Course not found' });
  }
});

const addCourse = asyncHandler(async (req, res) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({ status: 'success', data: { newCourse } });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.update(req.body);
    res.json({ status: 'success', data: { course } });
  } else {
    res.status(404).json({ status: 'fail', message: 'Course not found' });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    res.json({ status: 'success', message: 'Course deleted' });
  } else {
    res.status(404).json({ status: 'fail', message: 'Course not found' });
  }
});

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
};
