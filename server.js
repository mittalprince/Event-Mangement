const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');


const app = express();
var port = 8000 ;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


app.use(validator());
app.use(session({
	secret: 'thisisasecretkey',
	resave: true,
	saveInitialized:true,
    // store:new MongoStore({mongooseConnection:mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use('/', routes);
app.use('/users', users);

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
})