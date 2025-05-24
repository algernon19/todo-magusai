var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');
const testCaseRouter = require('./routes/testCases');
const testStepsRouter = require('./routes/testSteps');
const executionsRouter = require('./routes/executions');
const reportsRouter = require('./routes/reports');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/api/reports', authenticateToken, reportsRouter);
app.use('/api/executions', authenticateToken, executionsRouter);
app.use('/api/testcases', authenticateToken, testStepsRouter);
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/testcases', testCaseRouter);

module.exports = app;
