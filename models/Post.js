var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    post:String,
    author:String
})

module.exports = mongoose.model('Post',userSchema)
