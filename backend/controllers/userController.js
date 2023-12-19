/*
desc - To authenticate
route - POST /api/users/auth
access- Public
*/

import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const userAuthHandler =expressAsyncHandler(async (req,res) => {
    res.status(200).json({message:'Successfully Integrated'})
})

/*
desc - To register user
route - POST /api/users
access- Public
*/

const registerUser = expressAsyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    const userFound = await User.findOne({email:email});
    if(userFound) res.status(401).json({message:'User already exist'})

    let user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            name:user.name,
            email:user.email,
            id:user._Id
        })
    }else{
        res.status(400).json({message:"Data is invalid"})
    }
    res.status(200).json({message:'Register User'});
})

/*
desc - To logout user
route - Post /api/users/logout
access- Public
*/

const logoutUser = expressAsyncHandler(async(req,res) => {
    res.status(200).json({message:'user Logged Out'});
})

/*
desc - To get profile
route - Get /api/users/profile
access- Public
*/

const getUserProfile = expressAsyncHandler(async(req,res) => {
    res.status(200).json({message:'user profile fetched'});
})

/*
desc - To update profile
route - Get /api/users/profile
access- Public
*/

const updateUserProfile = expressAsyncHandler(async (req,res) => {
    res.status(200).json({message:'user profile updated'});
})



export {
    userAuthHandler,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};