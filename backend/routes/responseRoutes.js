const express = require('express')
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { createTest, submitTest } = require('../controllers/responseController');

router.route('/createtest').get(protect,createTest)
router.route('/submit').post(protect,submitTest)
module.exports = router;