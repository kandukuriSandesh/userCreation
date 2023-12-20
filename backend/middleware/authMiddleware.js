import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import expressAsyncHandler from 'express-async-handler';

const protect = expressAsyncHandler(async (req,res,next) => {
  if(!req.cookies.jwt) throw new Error ('Token is Required')  
  let token  = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
  if(token){
      const user = await User.findById(token.userId).select('-password');
      //console.log(user)
      req.user = user
      next()
  }else{
    res.status(401)
    throw new Error("Invalid Token")
  }
})


export {protect}