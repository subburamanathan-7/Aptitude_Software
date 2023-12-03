const express = require('express');
const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { listQuestions, createQuestion, getQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionControllers');
const router = express.Router();


router.route('/').get(listQuestions).post(createQuestion)
router.route('/:id')
    .get(getQuestion)
    .put(updateQuestion)
    .delete(deleteQuestion)


module.exports = router;
