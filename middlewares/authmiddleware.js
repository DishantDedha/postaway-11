import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRepositoty from "../src/Users/userrespository.js";



dotenv.config();

const authrepo= new userRepositoty();

 const jwtauthMiddleware= async(req,res,next)=>{
    let token;

    const authHeader=req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
    }

    if(!token){
        return res.status(402).json({message:"authorization failed"})
    }
      try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await authrepo.findUserById(decoded._id);
        if(!user || !user.tokens.some((t)=>t.token===token)){
            throw new Error();
        }
        req.user=user;
        req.token=token;
        next();

      }catch(error)
      {
        console.error(error);
        res.status(500).json({message:"invalid token"});
      }
}

export default jwtauthMiddleware;