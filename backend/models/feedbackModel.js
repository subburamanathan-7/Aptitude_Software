const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User', //Model Name
        },
        ui: {
            type: String,
        },
        difficulty: {
            type: String,
        },
        suggestion: {
            type: String,
        },
    }
)

module.exports = mongoose.model('Feedback',feedbackSchema)
