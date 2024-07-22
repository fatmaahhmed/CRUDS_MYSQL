const sequelize = require('./config/database');
const Student = require('./models/student');
const Course = require('./models/course');
const Enrollment = require('./models/Enrollment');
const express = require('express');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/courseRoutes');

const cors= require ('cors')
const app = express();
const PORT = process.env.PORT || 3030;
const SERVER = 'localhost';
app.use(bodyParser.json());
app.use(cors())
app.get('/', function(req, res){
  console.log('helo')
  res.send('Hello World!')


})
app.use('/api/users',userRoutes);
app.use('/api/courses', courseRoutes);/*  */
app.all('*',(req,res,next)=>{
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
    data: null,
  });
})


sequelize.sync()
  .then(() => {
    app.listen(PORT, SERVER, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) =>{
    if (err) {
      console.log('Unable to connect to the database:', err);
      console.log('Error: ' + err);
  }
})
    