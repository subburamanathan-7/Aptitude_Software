const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        regNo: {
            type: String,
            required: true
        },
        dept: {
            type: String,
            required: true
        },
        email:{
            type:String,
            required:[true,'Please add an email']
        },
        active:{
            type: Boolean,
        },
        password:{
            type:String,
        },
        role:{
            type:String,
            enum:['Student','Admin'],
            required:[true, 'Please specify the role']
        },
    }
)

module.exports = mongoose.model('User',userSchema)
