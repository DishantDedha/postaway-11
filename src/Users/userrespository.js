import User from "./usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class userRepositoty{
    
    async createUser(name,email,password,gender){
       
       const user= new User({name,email,password,gender});
        const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
         await user.save();
         console.log("new user created successfully",user);
         return user;
    }

     async findUserByEmail(email){
        let user= await User.findOne({email});
         return user;
            
       
     }
     async findUserById(id){
        let user= await User.findById(id);
        return user;
     }

     async generateAuthToken(user){
        const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
        user.tokens=user.tokens.concat({token});
        await user.save();
        return token;


     }
     async logoutUser(user,token){
        user.tokens=user.tokens.filter((t)=>t.token !==token);
        await user.save();

     }
     async logoutAllDevices(user){
       user.tokens=[];
       await user.save();
     }
    async getAll(){
      const users= User.find().select('-password -tokens');
      return users;
    }
    async getUserById(id){
      let user= await User.findById(id).select('-password -tokens');
      return user;
   }
   async updateUserDetails(userId, updateData) {
      return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
  }
}
   