const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    email:String,
    password:String
})

const userModel = mongoose.model("user",UserScheme)

module.exports={
    userModel
}