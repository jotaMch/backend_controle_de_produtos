const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name:String,
    price:String,
    quantity:String,
})

module.exports = User;