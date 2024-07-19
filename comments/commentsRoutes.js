import express from "express";
import { getComments,postComments,updateComments,deleteComments } from "./commentController.js";
import jwtauthMiddleware from "../middlewares/authmiddleware.js";


const router= express.Router();


router.get("/:postId",jwtauthMiddleware,getComments); 
router.post("/:postId",jwtauthMiddleware,postComments);
router.put("/:commentId",jwtauthMiddleware,updateComments);
router.delete("/:commentId",jwtauthMiddleware,deleteComments);


export default router;


