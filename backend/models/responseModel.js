const mongoose = require('mongoose');

// const testSetSchema = mongoose.Schema({
//     questionID:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'Question', //Model Name
//     },
//     respondedAnser:{
//         type:String
//     }
// })

const responseSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User', //Model Name
    },
    
    totalScore: {
        type: String,
    },
    aptitudeScore: {
        type: String,
    },
    verbalScore: {
        type: String,
    },
    codingScore: {
        type: String,
    },
    coreScore: {
        type: String,
    },
    timeTaken:{
        type:String
    },
    responseTime:{
        type:Date,
        default:Date.now
    },
    switchCount:{
        type:String,
    }
});

module.exports = mongoose.model('Response',responseSchema)