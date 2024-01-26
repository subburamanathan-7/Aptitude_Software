const express = require('express')
const router = express.Router();

const {protect, authOnlyAdmin} = require('../middlewares/authMiddlewares')
const {registerUser, logoutUser, registerAdmin, loginAdmin, resetLogin, createSession, getSession} =  require('../controllers/userControllers');

router.route('/register').post(registerUser)
router.route('/logout').post(protect,logoutUser)

router.route('/aregister').post(registerAdmin)
router.route('/alogin').post(loginAdmin)

router.route('/reset').post(protect,authOnlyAdmin,resetLogin)
router.route('/createsession').post(protect,authOnlyAdmin,createSession)

router.route('/getsession').post(protect,getSession)
router.route('/sessioncheck').get(protect,getSession)

module.exports = router; 