import mongoose from "mongoose";

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