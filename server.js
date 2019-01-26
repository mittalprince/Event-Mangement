var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

var app = express();
var port = 8000 ;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.get('/', (req,res) =>{
	res.render('index');
})

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
})