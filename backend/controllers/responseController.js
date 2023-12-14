const asyncHandler = require("express-async-handler")

const Response = require('../models/responseModel')
const Question = require('../models/questionModel');
const User = require('../models/userModels');
const { set } = require("mongoose");

const createTest = asyncHandler(async(req,res)=>{
    // console.log(req.user)
    let regNo = req.user.regNo;

    //Set numbers [0,1,2]
    let setNumber = Number(regNo.slice(-6)) % 3
    setNumber = String(setNumber);
    console.log(setNumber)
    let verbalQuestion = await Question.find({ $and: [{ questionCategory: "verbal" }, { questionSet: setNumber }] });
    let aptitudeQuestion = await Question.find({ $and: [{ questionCategory: "aptitude" }, { questionSet: setNumber }] });
    let coreQuestion = await Question.find({ $and: [{ questionCategory: "core" }, { questionCore: req.user.dept }] });
    let codingQuestion = await Question.find({ $and: [{ questionCategory: "coding" }, { questionSet: setNumber }] });

    function shuffleQuestions(array) {
        let currentIndex = array.length, randomIndex, temp;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          temp = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temp;
        //   [array[currentIndex], array[randomIndex]] = [
        //     array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    shuffleQuestions(verbalQuestion);
    shuffleQuestions(aptitudeQuestion);
    shuffleQuestions(coreQuestion);
    shuffleQuestions(codingQuestion);

    let questionList = verbalQuestion;
    questionList = questionList.concat(aptitudeQuestion);
    questionList = questionList.concat(coreQuestion);
    questionList = questionList.concat(codingQuestion);

    if(questionList){
        res.status(201).json(questionList);
    }
    else{
        res.status(400);
        throw new Error("Error creating QuestionList");
    }
})

const submitTest = asyncHandler(async(req,res)=>{
    const { 
        totalScore,
        aptitudeScore,
        verbalScore,
        codingScore,
        coreScore,
        timeTaken
    } = req.body;

    const responseExists = await Response.findOne({user:req.user._id})
    if(responseExists){
        res.status(400)
        throw new Error('Response Already Submitted')
    }

    const newResponse = await Response.create({
        user:req.user._id,
        totalScore,
        aptitudeScore,
        verbalScore,
        codingScore,
        coreScore,
        timeTaken
    })
    
    if(newResponse){
        res.status(201).json(newResponse)
    }
    else{
        throw new Error('Test Not Submitted')
    }

})

module.exports = {
    createTest,
    submitTest
}