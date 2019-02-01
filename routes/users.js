var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


router.get('/register', function(req, res){
    res.render('register');
});


router.get('/login', function(req, res){
    res.render('login');
});


router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;


    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var error = req.validationErrors();

    if(error){
        res.render('register',{
            error:error
        });
    } else {
        User.findOne({email:email, username:username}).then(function(currentUser){
            if(currentUser){
                console.log('user is already registered:',currentUser)
                // req.flash('success_msg', 'User is already registered with same username or email');
                res.render('register', { success_msg: 'User is already registered with username or email'});

            }
            else {
                var newUser = new User({
                    name: name,
                    email:email,
                    username: username,
                    password: password
                });

                User.createUser(newUser, function(err, user){
                    if(err) throw err;
                    console.log(user);
                });

                // req.flash('success_msg', 'You are registered and can now login');

                res.render('login', { success_msg: 'You are registered and can now login'});
            }
        })

    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        console.log(req.body);
        req.flash('success_msg', 'Successfully Login');
        res.redirect('/dashboard', {success_msg: 'Successfully Login'});
    });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

module.exports = router;