/*
desc - To authenticate
route - POST /api/users/auth
access- Public
*/

import expressAsyncHandler from "express-async-handler";

const userAuthHandler =expressAsyncHandler(async (req,res) => {
    res.status(200).json({message:'Successfully Integrated'})
})

/*
desc - To register user
route - POST /api/users
access- Public
*/

const registerUser = expressAsyncHandler(async(req,res) => {
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