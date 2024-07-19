import crypto from "crypto";
import Otp from "./otpModel.js";
import User from "../src/Users/usermodel.js";


export default class otpRepository{

    async newOtp(userId){
        const otp= crypto.randomBytes(3).toString('hex');
        const expiresAt= Date.now()+ 10*60*1000;


        const otpDoc= new Otp({
            user:userId,
            otp,
            expiresAt
        })

        await otpDoc.save();
        return otp;
    }
    async verifyOtp(userId,otp){
       const otpDoc = await Otp.find({userId});
       console.log(otpDoc);
       if (!otpDoc) {
        throw new Error('Invalid OTP');
    }
    if (otpDoc.expiresAt < Date.now()) {
        await Otp.deleteOne({ userId, otp });
        throw new Error('OTP expired');
    }
    return otpDoc;

    }

    async resetPassword(userId,newPassword){
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.password = newPassword;
        await user.save();
        await Otp.deleteMany({ userId });
        return user;
    }

}
