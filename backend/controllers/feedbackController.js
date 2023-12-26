const asyncHandler = require("express-async-handler")

const Feedback = require('../models/feedbackModel');
const submitResponse = asyncHandler(async(req,res)=>{
    const { 
        rating1,
        rating2,
        comments,
    } = req.body;

    const feedbackExists = await Feedback.findOne({user:req.user._id})
    if(feedbackExists){
        res.status(400)
        throw new Error('Response Already Submitted')
    }

    const newFeedback = await Feedback.create({
        user:req.user._id,
        ui:rating1,
        difficulty:rating2,
       suggestion: comments
    })
    
    if(newFeedback){
        res.status(201).json(newFeedback)
    }
    else{
        throw new Error('Feedback Not Submitted')
    }
})

module.exports={
    submitResponse
}