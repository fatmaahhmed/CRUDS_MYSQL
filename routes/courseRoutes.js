const express = require('express');
// const validation = require('../validation/validation');
const coursesController = require('../controllers/courseController.js');
const courseRouter = express.Router();

// Middleware to extract ID from URL parameters and set it in the request body
function extractIdFromURL(req, res, next) {
    const id = req.params.id;
    req.body.id = id;
    next();
}

courseRouter.route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.addCourse);
    // .delete(coursesController.removeCourse);

courseRouter.route('/:id')
    .get(coursesController.getCourseById)
    .patch( coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

// Export the router
module.exports = courseRouter;
