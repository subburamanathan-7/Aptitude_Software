const express = require('express');
const router = express.Router();

const { protect, authOnlyAdmin } = require('../middlewares/authMiddlewares');
const { submitResponse } = require('../controllers/feedbackController');

router.route('/submit').post(protect,submitResponse)


module.exports = router;
 