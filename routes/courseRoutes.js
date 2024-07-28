const express = require('express');

// const validation = require('../validation/validation');
const coursesController = require('../controllers/courseController.js');
const courseRouter = express.Router();
const verifyToken = require('../middleware/verifyToken');
const allowedTo=require('../middleware/allowedTo');

// Middleware to extract ID from URL parameters and set it in the request body
function extractIdFromURL(req, res, next) {
    const id = req.params.id;
    req.body.id = id;
    next();
}

courseRouter.route('/')
    .get(verifyToken,coursesController.getAllCourses)
    .post(verifyToken,allowedTo,coursesController.addCourse);
    // .delete(coursesController.removeCourse);

courseRouter.route('/:id')
    .get(coursesController.getCourseById)
    .patch(coursesController.updateCourse)
    .delete(verifyToken,allowedTo,coursesController.deleteCourse);

// Export the router
module.exports = courseRouter;
