const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./router/tourRoutes');
const userRouter = require('./router/userRoutes');

// 1) MIDLEWARE
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
