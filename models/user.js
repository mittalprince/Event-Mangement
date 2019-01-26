const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({

	username: {type: String, unique: true, default: ''},
    fullname: {type: String, unique: true, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
})