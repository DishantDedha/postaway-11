import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase= async()=>{
  try{
    const connect=   await mongoose.connect(process.env.MONGODB_URI)
       
    console.log(connect.connection.host)
    console.log("Connected to mongodb")
}catch(error)
{
    console.error("cannot connect to databse",error);
    process.exit(1);
}
} 

export default connectToDatabase;