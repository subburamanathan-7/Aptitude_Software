const express = require('express')
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { createTest, submitTest, responseCheck,feedbackCheck, getTime } = require('../controllers/responseController');

router.route('/createtest').get(protect,createTest)
router.route('/submit').post(protect,submitTest)
router.route('/responsecheck').get(protect,responseCheck)
// router.route('/feedbackcheck').get(protect,feedbackCheck)

module.exports = router;