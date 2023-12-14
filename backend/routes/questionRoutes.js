const express = require('express');
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { listQuestions, createQuestion, getQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionControllers');

router.route('/').get(protect,authOnlyAdmin,listQuestions).post(protect,authOnlyAdmin,createQuestion)

router.route('/:id').get(protect,authOnlyAdmin,getQuestion).put(protect,authOnlyAdmin,updateQuestion).delete(protect,authOnlyAdmin,deleteQuestion)

module.exports = router;
 