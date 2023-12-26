const express = require('express')
const router = express.Router();

const {protect, authOnlyAdmin} = require('../middlewares/authMiddlewares')
const {registerUser, logoutUser, registerAdmin, loginAdmin, resetLogin} =  require('../controllers/userControllers')

router.route('/register').post(registerUser)
router.route('/logout').post(protect,logoutUser)

router.route('/aregister').post(protect,authOnlyAdmin,registerAdmin)
router.route('/alogin').post(loginAdmin)

router.route('/reset').post(protect,authOnlyAdmin,resetLogin)


module.exports = router; 