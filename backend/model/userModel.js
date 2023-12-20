import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

let userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
},{
    timestamps:true
})


userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next()
  }
  
  let hashedpassword = await bcrypt.hash(this.password,10)
  this.password =  hashedpassword;
  next()
})

let User = mongoose.model('User',userSchema)
export default User;