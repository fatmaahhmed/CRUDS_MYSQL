const Course = require('../models/course');
console.log('Course model loaded successfully ')


const getAllCourses = async (req, res) => {
  console.log('getAllCourses')
  try {
    console.log('getAllCourses')
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.log('Error getting--------------------------------------------------------');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  console.log('getCourseById')
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCourse = async (req, res) => {
  console.log('addCourse')
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  console.Console.log('updateCourse')
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.update(req.body);
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  console.log('deleteCourse')
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
