import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
   },
   password:{
          type:String,
          required:true
   },
   avatar:{
       type:String

   },
   gender:{
    type:String,
   },

   posts:[{
       
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
       
   }],
   
   tokens:[{
    token:{
        type:String,
        required:true
    }

   }],

   friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }],

   friendRequests:[{
    requestor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    state:{
       type:String,
       enum:['PENDING','ACCEPTED','REJECTED'],
       default:'PENDING'

    }
   }]

});



const User= new mongoose.model("User",userSchema);
export default User;
