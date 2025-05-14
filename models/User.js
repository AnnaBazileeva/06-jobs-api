const mongoose = require('mongoose')
const {string} = require("joi");

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Prlease provide name'],
        minlength:3,
        maxlength:20
    },
    email: {
        type:String,
        required: [true, 'Prlease provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
        unique:true
},
    password: {
        type:String,
        required: [true, 'Please provide password'],
        minlength:6,
        maxlength:10
    }
})

module.exports = mongoose.model('User', UserSchema)