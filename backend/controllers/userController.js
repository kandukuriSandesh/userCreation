/*
desc - To authenticate
route - POST /api/users/auth
access- Public
*/

import expressAsyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

const userAuthHandler =expressAsyncHandler(async (req,res) => {
    
    const {name,email,password} = req.body;
    const userFound = await User.findOne({email:email})
   // console.log(userFound)
    if(userFound){
        let passwordMatched = await bcrypt.compare(password,userFound.password)
        if(passwordMatched){
            generateToken(res,userFound._id)
            res.status(201).json({message:"User Succesfully Logged In"})
        }else{
            res.status(400);
            throw new Error("Invalid Password")
        }
    }else{
        res.status(404).json({message:"Email or Password is Incorrect"})
    }
    
    //res.status(200).json({message:'Successfully Integrated'})
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
        generateToken(res,user._id)
        res.status(201).json({
            name:user.name,
            email:user.email,
            id:user._id
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
    res.cookie('jwt','',{
        expiresIn:"0ms"
    });
    res.status(200).json({message:'Succesfully Looged Out'});
    //res.status(200).json({message:'user Logged Out'});
})

/*
desc - To get profile
route - Get /api/users/profile
access- Public
*/

const getUserProfile = expressAsyncHandler(async(req,res) => {
    if(req.user){
        const user = {
            name:req.user.name,
            email:req.user.email,
            id:req.user._id
        }
       // console.log(user)
        res.status(200).json(user)
    }else{
        res.status(400).json({message:'Unknown Error'})
    }
    //res.status(200).json({message:'user profile fetched'});
})

/*
desc - To update profile
route - Get /api/users/profile
access- Public
*/

const updateUserProfile = expressAsyncHandler(async (req,res) => {
   
      const user = await User.findById(req.user._id);
      
      if(user){
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          if(req.body.password){
              user.password = req.body.password
        }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser)
      }else{
        res.status(404)
        throw new Error('User Not Found')

      }
   
   // res.status(200).json({message:'user profile updated'});
})



export {
    userAuthHandler,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};