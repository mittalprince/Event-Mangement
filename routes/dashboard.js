var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router.get('/', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

router.get('/eventregister', ensureAuthenticated, function(req, res){
    res.render('event-register');
})

router.post('/eventregister', ensureAuthenticated, function(req,res){
    var eventname =  req.body.eventname;
    var location = req.body.location;
    var organization = req.body.organization;
    var date = req.body.date;
    var details = req.body.details;
    var contact = req.body.contact;

    req.checkBody('eventname', 'Event name is required').notEmpty();
    req.checkBody('location', 'Location is required').notEmpty();
    req.checkBody('organization', 'Organization name is required').notEmpty();
    req.checkBody('details', 'Details of event required').isLength({min: 10})
    req.checkBody('contact', 'Contact no is invalid').isLength({min: 10}).isLength({max:10});
    req.checkBody('contact', 'Contact no should be numeric').isNumeric();

    error = req.validationErrors();
    if(error){
        res.render('event-register',{
            error: error
        })
    } else{

        Event.findOne({location: location, organization: organization, eventname: eventname, date: date}).then( (currentevent) => {
            if(currentevent){
                console.log('Event is already registered', currentevent);
                res.render('event-register', {success_msg: 'Event is already registered with same credentials'})
            }
            else{
                var newEvent = new Event({
                    eventname: eventname,
                    location: location,
                    organization: organization,
                    date: date,
                    details: details,
                    contact: contact
                });
        
                newEvent.save((err, event) => {
                    if(err) throw err;
                    // console.log(event);
                });
                res.render('dashboard',{ success_msg: "Successfully Event registered"});
            }  
        })
    }
})

module.exports = router;