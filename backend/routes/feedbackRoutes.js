const express = require('express');
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { submitResponse, feedbackCheck } = require('../controllers/feedbackController');

router.route('/submit').post(protect,submitResponse)
router.route('/feedbackcheck').get(protect,feedbackCheck)


module.exports = router;
 