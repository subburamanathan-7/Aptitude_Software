const express = require('express')
const router = express.Router();

const {protect, authOnlyAdmin} = require('../middlewares/authMiddlewares')
const {registerUser, logoutUser, registerAdmin, loginAdmin} =  require('../controllers/userControllers')

router.route('/register').post(registerUser)
router.route('/logout').post(protect,logoutUser)

router.route('/aregister').post(registerAdmin)
router.route('/alogin').post(loginAdmin)

module.exports = router;