const asyncHandler = require("express-async-handler")

const User = require('../models/userModels');
const Question = require('../models/questionModel');
const Response = require('../models/responseModel');
const Admin = require('../models/adminModels');

const createTest = asyncHandler(async(req,res)=>{
    // console.log(req.user)
    let regNo = req.user.regNo;

    //Set numbers [0,1,2]
    let setNumber = Number(regNo.slice(-6)) % 3
    setNumber = String(setNumber);
    // console.log(setNumber)
    let verbalQuestion = await Question.find({ $and: [{ questionCategory: "verbal" }, { questionSet: 0 }] },
    {
        _id:1,
        questionString:1,
        questionImage:1,
        questionCategory:1,
        questionOptions:1
        
    });
    let aptitudeQuestion = await Question.find({ $and: [{ questionCategory: "aptitude" }, { questionSet: 0 }]},{
        _id:1,
        questionString:1,
        questionImage:1,
        questionCategory:1,
        questionOptions:1
        
    } );
    let coreQuestion = await Question.find({ $and: [{ questionCategory: "core" }, { questionCore: req.user.dept }] },{
        _id:1,
        questionString:1,
        questionImage:1,
        questionCategory:1,
        questionOptions:1,
        questionCore:1,
        
    });
    let codingQuestion = await Question.find({ $and: [{ questionCategory: "coding" }, { questionSet: 0 }] },{
        _id:1,
        questionString:1,
        questionImage:1,
        questionCategory:1,
        questionOptions:1
    });
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
        selectedOptions,
        timeTaken,
        switchCount
    } = req.body;

    const responseExists = await Response.findOne({user:req.user._id})
    if(responseExists){
        res.status(400)
        throw new Error('Response Already Submitted')
    }

    const questionList = await Question.find({});
    let selectedQuestion, totalScore=0, verbalScore=0, aptitudeScore=0, coreScore=0, codingScore=0;

    selectedOptions.map((selectedOption)=>{       
        if(selectedOption){
            selectedQuestion = questionList.filter(ele=>ele._id==selectedOption.questionID)
            if(selectedOption.answerString===selectedQuestion[0].questionAnswer){
                
                if(selectedQuestion[0].questionCategory==='verbal'){
                    verbalScore+=1;
                }
                else if(selectedQuestion[0].questionCategory==='aptitude'){
                    aptitudeScore+=1
                }
                else if(selectedQuestion[0].questionCategory==='core'){
                    coreScore+=1
                }
                else{
                    codingScore+=1
                }
                totalScore=totalScore+1;
            }
        }
    })
  
    const newResponse = await Response.create({
        user:req.user._id,
        name:req.user.fullName,
        dept:req.user.dept,
        regNo:req.user.regNo,
        totalScore,
        aptitudeScore,
        verbalScore,
        codingScore,
        coreScore,
        timeTaken,
        switchCount
    })
    
    if(newResponse){
        res.status(201).json(newResponse)
    }
    else{
        throw new Error('Test Not Submitted')
    }
})

const responseCheck = asyncHandler(async(req,res)=>{

    const responseExists = await Response.findOne({user:req.user._id})
    if(responseExists){
        res.status(202).json({responseExists:true})
    }
    else{
        res.status(202).json({responseExists:false})
    }
})

module.exports = {
    createTest,
    submitTest,
    responseCheck,
    
}