const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler")

const User = require('../models/userModels')
const Admin = require('../models/adminModels')

const generateToken = require("../config/generateToken.js");

// @desc registerUser
// @route POST api/user/register
// @access Public
const registerUser = asyncHandler(async(req,res)=>{

    const {
        fullName,
        regNo,
        dept,
        email,
        role,
        sessionCode,
    } = req.body;

    if(!fullName || !email || !role || !fullName || !regNo || !dept || !sessionCode){
        res.status(400)
        throw new Error('Please add the neccesary fields')
    }

    const userExists = await User.findOne({ $and: [{ regNo }, { role }] });
    const currentSession = await Admin.findOne({})


    if(userExists){
        if(userExists.active){
            throw new Error('User Already Logged In')
        }
        else{
            if(currentSession){
                // console.log(currentSession)
                if(currentSession.sessioncode===sessionCode){
                    
                    const value = {$set:{active:true}}
                    await User.updateOne({_id:userExists._id},value)
                    const loggedInUser = await User.findById(userExists._id)
        
                    res.json({
                        _id: loggedInUser._id,
                        fullName: loggedInUser.fullName,
                        regNo: loggedInUser.regNo,
                        email: loggedInUser.email,
                        dept: loggedInUser.dept,
                        role: loggedInUser.role,
                        active: loggedInUser.active,
                        token: generateToken(loggedInUser._id),
                    })

                }
                else{
                    res.status(402)
                    throw new Error('Invalid Session Code')
                }
            }
            else{
                res.status(402)
                    throw new Error('No Sessions Available')
            }
        }
    }
    else{
        if(currentSession){
            // console.log(currentSession)
            if(currentSession.sessioncode===sessionCode){
                const newUser = await User.create({
                    fullName,
                    regNo,
                    dept, 
                    email,
                    role,
                    active:true
                });

                if(newUser){
            
                    res.status(201).json({
                        _id: newUser._id,
                        fullName: newUser.fullName,
                        regNo: newUser.regNo,
                        email: newUser.email,
                        dept: newUser.dept,
                        role: newUser.role,
                        active: newUser.active,
                        token: generateToken(newUser._id),
                    })
        
                }
                else {
                    res.status(400)
                    throw new Error('Unsuccessful Registration')
                }

            }
            else{
                res.status(402)
                throw new Error('Invalid Session Code')
            }
        }
        else{
            res.status(402)
                throw new Error('No Sessions Available ')
        }
    }
});

// @desc registerAdmin
// @route POST api/user/aregister
// @access Public {admin}
const registerAdmin = asyncHandler(async(req,res)=>{
    const {
        fullName,
        regNo,
        dept,
        email,
        password,
        role,
    } = req.body;

    if(!fullName || !email || !role || !fullName || !regNo || !dept || !password){
        res.status(400)
        throw new Error('Please add the neccesary fields')
    }

    const userExists = await User.findOne({ $and: [{ regNo }, { role }] });

    if(userExists){
        throw new Error('User Already Exist. Please Login')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await User.create({
        fullName,
        regNo,
        dept,
        email,
        role,
        password:hashedPassword,
    });

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            regNo: newUser.regNo,
            email: newUser.email,
            dept: newUser.dept,
            role: newUser.role,
            token: generateToken(newUser._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Unsuccessful Registration')
    }
})

// @desc loginAdmin
// @route POST api/user/alogin
// @access Public {admin}
const loginAdmin = asyncHandler(async(req,res)=>{
    const { regNo, password } = req.body;
    // const role = "Admin"

    const currentUser = await User.findOne({ $and: [{ regNo }, { role:"Admin" }] });

    if(currentUser && (await bcrypt.compare(password,currentUser.password)) && currentUser.role==="Admin"){
        

        res.status(201).json({

            fullName: currentUser.fullName,
            email: currentUser.email,
            regNo: currentUser.regNo,
            dept: currentUser.dept,
            role: currentUser.role,
            token: generateToken(currentUser._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Unsuccessful Credentials')
    }
})

// @desc ViewMyProfile
// @route POST api/user/profile
// @access Private{}
const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

// @desc logoutUser
// @route POST api/user/logout
// @access Private
const  logoutUser = asyncHandler(async(req,res)=>{
    // console.log(req.user)
    const value = {$set:{active:false}}
    await User.updateOne({_id:req.user._id},value)

    const loggedOutUser = await User.findById(req.user._id);

    if(loggedOutUser){
        res.status(201).json({
            fullName: loggedOutUser.fullName,
            email: loggedOutUser.email,
            regNo: loggedOutUser.regNo,
            dept: loggedOutUser.dept,
            role: loggedOutUser.role,
            active: loggedOutUser.active,
        })
    }
    else{
        throw new Error("Logout Failed")
    }

})


// @desc resetLogin
// @route POST api/user/reset
// @access Private {Admin}

const resetLogin = asyncHandler(async(req,res)=>{

    const {regNo} = req.body;
    // console.log(regNo)
    
    const value = {$set:{active:false}}
    await User.updateOne({regNo:regNo},value)

    const resetUser = await User.findOne({regNo:regNo});

    if(resetUser){
        res.status(201).json({resetUser})
    }
    else{
        res.status(400)
        throw new Error("Reset Failed")
    }

})


// @desc createSession
// @route POST api/user/createsession
// @access Private {Admin}

const createSession = asyncHandler(async(req,res)=>{
    
    const {sessionCode,startTime,endTime} = req.body;
    // console.log({sessionCode,startTime,endTime})

    const SessionExists = await Admin.findOne({admin_id:req.user._id})

    if(SessionExists){
        // console.log(SessionExists)
        if(sessionCode){
            await Admin.updateOne({admin_id:req.user._id},{sessioncode:sessionCode})
        }        
        if(startTime){
            await Admin.updateOne({admin_id:req.user._id},{startTime:startTime})
            await Admin.updateOne({admin_id:req.user._id},{endTime:endTime})
        }

        const updatedSession  = await Admin.findOne({admin_id:req.user._id})
        // console.log(updatedSession)
        if(updatedSession){
            res.status(200).json({updatedSession})
        }
        else{
            res.status(400)
            throw new Error('Session updation was unsuccesful')
        }
    }
    else{
        const newSession = await Admin.create({
            admin_id:req.user._id,
            sessioncode:sessionCode,
            startTime:startTime,
            endTime:endTime
        })
        if(newSession){
            res.status(200).json({newSession})
        }
        else{
            res.status(400)
            throw new Error('Session creation was unsuccesful')
        }

    }

})

// @desc Get Session
// @route GET api/user/getsession
// @access Private { Student}

const getSession = asyncHandler(async(req,res)=>{

    const currentSession = await Admin.find({},
        {
            endTime:1,
            startTime:1
        }
    )
    if(currentSession){
        res.status(200).json({currentSession})
    }
    else{
        res.status(400)
        throw new Error('Session Yet to be Created')
    }

})


module.exports = {
    registerUser,
    registerAdmin,
    loginAdmin,
    getMe,
    logoutUser,

    resetLogin,
    createSession,
    getSession
}