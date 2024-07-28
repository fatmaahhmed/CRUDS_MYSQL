// app.js
const express = require('express');
const app = express();
const verifyToken = require('./verifyToken');

app.use(verifyToken());

app.get('/', (req, res) => {
    res.send(`Welcome! Your user ID is ${req.user.id}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
