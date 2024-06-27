const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());

app.use('/api', courseRoutes);


sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) =>{
    if (err) {
      console.log('Unable to connect to the database:', err);
      console.log('Error: ' + err);
  }
})
    