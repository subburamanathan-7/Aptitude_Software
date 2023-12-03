const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const User = require('../models/userModels')

//General Authorization
const protect = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            // token = token.substring(1,token.length-1)
            // console.log(token)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded.id)
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user)
            next()
        }
        catch(error){
            res.status(401)
            throw new Error('Not Authorized')
        }

    }
    if(!token){
        res.status(402)
        throw new Error('Token Not Found')
    }
});

//authenticates only Admin
const authOnlyAdmin = asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === "admin") {
        next();
    } else {
        res.status(401)
        throw new Error("Not Authorized");
    }
})

module.exports = { protect, authOnlyAdmin }