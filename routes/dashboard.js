var express = require('express');
var router = express.Router();
const flash = require('connect-flash');
const validator = require('express-validator');

router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;