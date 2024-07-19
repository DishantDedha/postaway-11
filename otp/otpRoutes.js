import express from "express";
import jwtauthMiddleware from "../middlewares/authmiddleware.js";
import { sendOtp,verifyOtp,resetPassword } from "./otpController.js";

const router= express.Router();


router.post("/send",jwtauthMiddleware,sendOtp);
router.post('/verify',jwtauthMiddleware,verifyOtp);
router.post("/reset-password",jwtauthMiddleware,resetPassword);



export default router;