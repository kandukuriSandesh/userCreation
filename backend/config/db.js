import mongoose from 'mongoose';

const connectDb  = async () => {
   try{ 
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to Mongo URI ${conn.connection.host}`)
  }catch(err){
    console.log(err);
    process.exit(1)
  }
}

export default connectDb;