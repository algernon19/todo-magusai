var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');
const testCaseRouter = require('./routes/testCases');
const testStepsRouter = require('./src/routes/testSteps');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/testcases', authenticateToken, testStepsRouter);

app.use('/', indexRouter);
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/testcases', testCaseRouter);

module.exports = app;
