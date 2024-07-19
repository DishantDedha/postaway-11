import userRepositoty from "./userrespository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config();

const userRepo=new userRepositoty();

export const userSignup= async(req,res)=>{
    const{name,email,password,gender}=req.body;
    
    try{   
        let user= await userRepo.findUserByEmail(email);
       if (user) {
       res.status(402).json({message:"user already exist"})
    }

         user=   await userRepo.createUser(name,email,password,gender);
         const token= await userRepo.generateAuthToken(user);

        
            res.json({user,token});
    } catch(error)
    {
        console.error("not able to create user",error);
    }
}

 export const userSignin= async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user= await userRepo.findUserByEmail(email);
        if(!user){
            return res.status(400).json({message:"user doesnot exist"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"password is incorrect"});
        }
        const token= await userRepo.generateAuthToken(user);
        if(!token){
            return res.status(400).json({message:"token not genrated"});
        }
             res.json({user,token});
       

    }catch(error)
    {
        console.error(error.message);
        res.status(500).json({error:"server Error"});
    }

}  
export const getUser=async(req,res)=>{
    try {
        const user = await userRepo.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

         return res.json(user);
}catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
}
}
export const logoutUser=async(req,res)=>{
    try{
        await userRepo.logoutUser(req.user,req.token);
        res.json({ message: 'Logout successful' });

    }catch(error)
    {
        console.error(error.message);
        res.status(500).json({message:"Server Error"})
    }
}
export const logoutfromAll=async(req,res)=>{
    try{
        await userRepo.logoutAllDevices(req.user);
        res.json({ message: 'Logout successful from all devices' });

    }catch(error)
    {
        console.error(error.message);
        res.status(500).json({message:"Server Error"})
    }
}
export const getAllUsers= async(req,res)=>{
    try {
        const users = await userRepo.getAll();
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

         return res.json(users);
}catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
}
}
export const updateUserDetails = async (req, res) => {
    const userId= req.user.id
    console.log(req.user.id);
    const updateData = req.body;
    console.log(updateData);
    try {
        const user = await userRepo.updateUserDetails(userId, updateData);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};