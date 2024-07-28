const jwt = require('jsonwebtoken');
const HttpStatus = require('../utils/httpStatus');
const allowedTo=async(req, res, next)=>{
    if(req.decoded.role === 'admin'){
        next();
    }
    else {
        res.status(HttpStatus.FORBIDDEN).json({
          status: 'fail',message: 'You are not authorized to add courses',
        });
    }}
module.exports = allowedTo

