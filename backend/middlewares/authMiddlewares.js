const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const User = require('../models/userModels')
const Question  =  require('../models/questionModel')

//General Authorization
const protect = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            token = token.substring(1,token.length-1)
            // console.log(token)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded.id)
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user)
            next();
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
const authOnlyAdmin = (req, res, next) => {
    if (req.user && req.user.role==='Admin') {
        next()
    } 
    else {
        res.status(401)
        throw new Error("Not Authorized as an admin");
    }
}

module.exports = { protect, authOnlyAdmin }