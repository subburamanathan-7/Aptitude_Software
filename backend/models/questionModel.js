const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    
    answerString:{
        type:String
    },
    answerImage:{
        type:String
    }
})
const questionSchema =  mongoose.Schema({

    questionString:{
        type:String,
    },

    questionImage:{
        type:String
    },

    //Department
    questionCore:{
        type:String
    },

    questionCategory:{
        type:String,
        enum:[
            'aptitude',
            'verbal',
            'core',
            'coding'
        ]
    },
    questionSet:{
        type:String
    },

    // questionLevel:{
    //     type:String,
    //     enum:[
    //         'easy',
    //         'medium',
    //         'hard',
    //     ]
    // },

    questionOptions: new Array(answerSchema),
    
    questionAnswer:{
        type:String,
    }
})

module.exports = mongoose.model('Question',questionSchema)