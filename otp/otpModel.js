import mongoose from "mongoose";


const otpSchema= new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    otp:{
         type:String,
         required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

const Otp= new mongoose.model("Otp",otpSchema);

export default Otp;