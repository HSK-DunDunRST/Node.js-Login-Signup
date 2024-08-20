// expressnpm 
const express = require('express');
const app = express();

// cookieParser
const cookieParser = require('cookie-parser');
const USER_COOKIE_KEY = 'USER';
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// DB
const db = require('./lib/db');

// path & portNumber
const path = require('path');
app.set('port', process.env.PORT || 3000);

// ejs
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// bootstrap
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// post
// app.use(express.urlencoded({extend: true}));

// login
app.get('/login', (req, res) => {
  res.render('login'); // login.ejs 파일을 렌더링
});

// signup
app.get('/signup', (req, res) => {
  res.render('signup'); // signup.ejs 파일을 렌더링
});


// router
var indexRouter = require('./router/');
var resultRouter = require('./router/result');
var uploadRouter = require('./router/upload');
var loginRouter = require('./router/login');
var signupRouter = require('./router/signup');


app.use('/', indexRouter);
app.use('/', resultRouter);
app.use('/', uploadRouter);
app.use(express.static('upload'))
app.use('/', loginRouter);
app.use('/', signupRouter);

app.listen(app.get('port'), () => {
  console.log('server is running at', app.get('port'));
});

