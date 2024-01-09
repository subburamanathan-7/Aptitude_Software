const asyncHandler = require('express-async-handler')

let questionList=[];

function shuffleQuestions(array) {
    let currentIndex = array.length, randomIndex, temp;
    
    while (currentIndex > 0) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

const fetchQuestions = (model) => {
    return async(req,res,next)=>{
        try{
            if(questionList.length>0) {
                console.log('Already Fetched')
            }
            else{
            let regNo = req.user.regNo;
            let setNumber = Number(regNo.slice(-6)) % 3
            setNumber = String(setNumber);
    
            let verbalQuestion = await model.find({ $and: [{ questionCategory: "verbal" }, { questionSet: 0 }] },
            {
                _id:1,
                questionString:1,
                questionImage:1,
                questionCategory:1,
                questionOptions:1
                
            });
            let aptitudeQuestion = await model.find({ $and: [{ questionCategory: "aptitude" }, { questionSet: 0 }]},{
                _id:1,
                questionString:1,
                questionImage:1,
                questionCategory:1,
                questionOptions:1
                
            } );
            let coreQuestion = await model.find({ $and: [{ questionCategory: "core" }, { questionCore: req.user.dept }] },{
                _id:1,
                questionString:1,
                questionImage:1,
                questionCategory:1,
                questionOptions:1,
                questionCore:1,
                
            });
            let codingQuestion = await model.find({ $and: [{ questionCategory: "coding" }, { questionSet: 0 }] },{
                _id:1,
                questionString:1,
                questionImage:1,
                questionCategory:1,
                questionOptions:1
            });
    
            shuffleQuestions(verbalQuestion);
            shuffleQuestions(aptitudeQuestion);
            shuffleQuestions(coreQuestion);
            shuffleQuestions(codingQuestion);
    
            questionList = verbalQuestion;
            questionList = questionList.concat(aptitudeQuestion);
            questionList = questionList.concat(coreQuestion);
            questionList = questionList.concat(codingQuestion);
    
            console.log('Fetched')
            }
            
            const paramsString = req.url.split('?')[1];
            const eachParamArray = paramsString.split('&');

            let params = {};
            
            eachParamArray.forEach((param) => {
                const key = param.split('=')[0];
                const value = param.split('=')[1];
                Object.assign(params, {[key]: value});
            });

            // console.log(params);

            const page = Number(params.page);
            const limit = 10;

            const startIndex = (page-1) * limit;
            const endIndex = page * limit;

            // console.log({page, limit})
            // console.log({startIndex, endIndex})

            let results = {};

            if(startIndex>0){
                results.previous ={
                    page: page - 1,
                    limit: limit
                }
            }

            // console.log(questionList.length)
            
            if(endIndex< questionList.length){
                results.next={
                    page: page + 1,
                    limit: limit
                }
            }

            results.results = questionList.slice(startIndex,endIndex)
            res.paginatedResults = results
            
            next();

        }
        
        catch(e){
            res.status(401)
            throw new Error('Test Not Created')
        }
       
}}

// function paginatedResults() {
//     return async (req, res, next) => {
//         try{
            
//             const paramsString = req.url.split('?')[1];
//             const eachParamArray = paramsString.split('&');

//             let params = {};
            
//             eachParamArray.forEach((param) => {
//                 const key = param.split('=')[0];
//                 const value = param.split('=')[1];
//                 Object.assign(params, {[key]: value});
//             });

//             console.log(params);

//             const page = Number(params.page);
//             const limit = Number(params.limit);

//             const startIndex = (page-1) * limit;
//             const endIndex = page * limit;

//             // console.log({page, limit})
//             // console.log({startIndex, endIndex})

//             let results = {};

//             if(startIndex>0){
//                 results.previous ={
//                     page: page - 1,
//                     limit: limit
//                 }
//             }
            
//             if(endIndex< questionList.length){
//                 results.next={
//                     page: page + 1,
//                     limit: limit
//                 }
//             }

//             results.results = questionList.slice(startIndex,endIndex)
//             res.paginatedResults = results
//             next()
            
//         }

//         catch(e){
//             res.status(401)
//             throw new Error('Error at Pagination')
//         }
//     }
// }

module.exports = {fetchQuestions }
