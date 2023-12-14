const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler")

const User = require('../models/userModels')
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
    } = req.body;

    if(!fullName || !email || !role || !fullName || !regNo || !dept){
        res.status(400)
        throw new Error('Please add the neccesary fields')
    }

    const userExists = await User.findOne({ $and: [{ regNo }, { role }] });

    if(userExists){
        if(userExists.active){
            throw new Error('User Already Logged In')
        }
        else{
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
    }
    else{
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
const logoutUser = asyncHandler(async(req,res)=>{
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

module.exports = {
    registerUser,
    registerAdmin,
    loginAdmin,
    getMe,
    logoutUser
}