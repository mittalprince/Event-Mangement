var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    eventname: {
        type: String,
        default: ''
    },
    eventimage: {
        type: String,
        default: ''
    },

    location: {
        type: String,
        default: ''
    },
    details: {
        type: String,
        default: ''
    },
    date: {
        type:Date,
        default: date.now
    },
    organization:{
        type: String,
        default: ''
    }
});

var Event = module.exports = mongoose.model('Event', EventSchema);