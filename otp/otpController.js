import otpRepository from "./otpRepository.js";
import nodemailer from "nodemailer";
import User from "../src/Users/usermodel.js";
import dotenv from "dotenv";

dotenv.config();

const otpRepo= new otpRepository();

export const sendOtp= async(req,res)=>{
    const email=req.user.email;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otp = await otpRepo.newOtp(req.user.id);
        // sending mail//creating transporter
        const transporter= nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user: process.env.EMAIL,
                pass:process.env.EMAIL_PASSWORD
            }

        });
        //CONFIGURING MAILOPTIONS
        const mailOptions= {
            from:process.env.EMAIL,
            to:email,
            subject: 'Your OTP for password reset',
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent successfully' });

    }catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    console.log(otp);
    const userId =req.user.id;
    console.log(userId);
    try {
        const optdoc=await otpRepo.verifyOtp(userId, otp);
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired OTP', error: error.message });
    }
};
export const resetPassword = async (req, res) => {
    const {otp, newPassword } = req.body;
    const userId= req.user.id;
    try {
        await otpRepo.verifyOtp(userId, otp);
        const user = await otpRepo.resetPassword(userId, newPassword);
        res.status(200).json({ message: 'Password reset successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Failed to reset password', error: error.message });
    }
};