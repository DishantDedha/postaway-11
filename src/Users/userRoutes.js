import express from "express";
import { userSignin,userSignup,getUser,logoutUser,logoutfromAll,getAllUsers,updateUserDetails} from "./usercontroller.js";

import jwtauthMiddleware from "../../middlewares/authmiddleware.js";


const router= express.Router();


router.post("/signup",userSignup);
router.post("/signin",userSignin);
router.get("/get-details",jwtauthMiddleware,getUser);
router.post("/logout",jwtauthMiddleware,logoutUser);
router.post("/logout-all-devices",jwtauthMiddleware,logoutfromAll);
router.get("/get-all-details",jwtauthMiddleware,getAllUsers);
router.put('/update-details', jwtauthMiddleware, updateUserDetails);



export default router;