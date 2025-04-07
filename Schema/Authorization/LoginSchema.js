const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        max : 255
    },
    email : {
        type : String,
        required : true,
        max : 100
    },
    password : {
        type : String,
        min : 6,
        max : 1024,
        required : true
    },
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("UserSchema",userSchema)