const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({

    admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User', //Model Name
    },
    sessioncode:{
        type:String,
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    responseTime:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Admin',adminSchema)
