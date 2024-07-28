const sequelize = require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handle=require('./middleware/handle');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const cors= require ('cors')
const app = express();
const PORT = process.env.PORT || 3030;
const SERVER = 'localhost';
// Middleware to parse form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());
app.use(cors())
app.get('/', function(req, res){
  console.log('helo')
  res.send('Hello World!')
})
app.use('/uploads',handle, express.static(path.join(__dirname,'uploads')));
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
    