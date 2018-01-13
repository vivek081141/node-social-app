var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    email:String,
    password: String,
    name: String,
    description: String
})

module.exports = mongoose.model('User',userSchema)

userSchema.pre('save',function(next){
    var user =this

    if(!user.isModified('password'))
        return next()

    bcrypt.hash(user.password, null, null, (err, hash)=>{
        console.log('hash:: ' + hash)

        user.password=hash;
        next()
    })

})