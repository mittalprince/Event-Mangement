const express = require('express');
const dotenv = require('dotenv').config();
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
const _ = require('lowdash');

var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var event = require('./routes/events');
// const { config } = require('dotenv/types');


const app = express();
var port = 8001 ;

mongoose.Promise = global.Promise;
const mongo_uri = process.env.mongo_uri;

const connect = mongoose.connect(mongo_uri, { useUnifiedTopology: true, useNewUrlParser: true });
connect.then((db) =>
{
    console.log("Database Connected Successfully");
}, (err) =>
{
    console.log("Error occur while connecting ", err);
})

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
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(validator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length){
            formParam += '[' +namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/event', event);


app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
})