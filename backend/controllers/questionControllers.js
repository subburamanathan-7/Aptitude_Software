const asyncHandler = require("express-async-handler")

const Question = require('../models/questionModel');
const { paginatedResults } = require("../middlewares/paginatedResults");
const { default: mongoose } = require("mongoose");

// @desc getAllQuestions
// @route GET api/question/
// @access Private { admin }

const listQuestions = asyncHandler(async(req,res)=>{

    const questions = await Question.find({})
    res.status(200).json({questions})

})

// @desc getQuestion
// @route GET api/question/:id
// @access Private { admin }

const getQuestion = asyncHandler(async(req,res)=>{
    const question = await Question.findById(req.params.id)
    res.status(200).json(question)
})

// @desc createQuestion
// @route POST api/question/
// @access Private { admin }

const createQuestion = asyncHandler(async(req,res)=>{
    const{
        questionString,
        questionImage,
        questionCore,
        questionCategory,
        questionSet,
        questionOptions,
        questionAnswer
    } = req.body;

    const newQuestion = await Question.create({
        questionString,
        questionImage:questionImage?questionImage:null,
        questionCore:questionCore?questionCore:null,
        questionCategory,
        questionSet:questionSet?questionSet:null,
        questionOptions,
        questionAnswer
    })

    if(newQuestion){
        res.status(201).json(newQuestion)
    }
    else{
        res.status(400)
        throw new Error('Invalid Question Data')
    }
})

// @desc getAllQuestions
// @route PUT api/question/:id
// @access Private { admin }

const updateQuestion = asyncHandler(async(req,res)=>{
    const question  = await Question.findById(req.params.id)
    if(!question){
        res.status(400)
        throw new Error('Question not listed')
    }
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(201).json({updatedQuestion})
})

// @desc getAllQuestions
// @route DEL api/question/:id
// @access Private { admin }

const deleteQuestion = asyncHandler(async(req,res)=>{
    const question  = await Question.findById(req.params.id)

    if(!question){
        res.status(400)
        throw new Error('Question not listed')
    }

    const removedQuestion = await Question.findByIdAndDelete(req.params.id)
    res.status(200).json({removedQuestion})
})

// @desc createTest
// @route POST api/question/createtest
// @access Private { admin }

const createTest = asyncHandler(async(req,res)=>{
    
})

// @desc paginateQuestions
// @route GET api/question/paginatequestions
// @access Public 

const paginateQuestions = asyncHandler(async(req,res)=>{
    res.json(res.paginatedResults)
})


module.exports ={
    listQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion, 
    paginateQuestions
}