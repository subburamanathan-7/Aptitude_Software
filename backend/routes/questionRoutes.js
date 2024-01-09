const express = require('express');
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const {paginatedResults, fetchQuestions} = require('../middlewares/paginatedResults')

const { listQuestions, createQuestion, getQuestion, updateQuestion, deleteQuestion,paginateQuestions } = require('../controllers/questionControllers');
const Question = require('../models/questionModel');

router.route('/paginatequestions').get(protect,fetchQuestions(Question),paginateQuestions)


router.route('/').get(protect,authOnlyAdmin,listQuestions).post(protect,authOnlyAdmin,createQuestion)

router.route('/:id').get(protect,authOnlyAdmin,getQuestion).put(protect,authOnlyAdmin,updateQuestion).delete(protect,authOnlyAdmin,deleteQuestion)

module.exports = router;
 