var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    eventname: {
        type: String,
        default: ''
    },
    eventimage: {
        type: String,
        default: 'https://picsum.photos/600/300/?image=25'
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
        default: Date()
    },
    organization:{
        type: String,
        default: ''
    },
    contact: {
        type: Number,
        default: ''
    }
});

var Event = module.exports = mongoose.model('Event', EventSchema);