import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  name:{
    type:"string",
    required:true
  },
  email:{
    type:"string",
    required:true,
    unique:true
  },
  password:{
    type:"string",
    required:true
  },
},{
    timestamps:true
})

let User = mongoose.model('User',userSchema)

userSchema.pre('save', async function(next){
    if(!this.isModified(password)){
        return next()
    }

    let hashedpassword = await bcript.hash(password,10)
    this.password =  hashedpassword;
    next()
})

export default User;