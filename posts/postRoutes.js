import express from "express";
import { getAllPosts,getPostById,getPostByUser,createPost,updatePost,deletePost } from "./postControllers.js";
import jwtauthMiddleware from "../middlewares/authmiddleware.js";

const router= express.Router();

router.get("/all",getAllPosts);
router.get("/",jwtauthMiddleware,getPostByUser);
router.get("/:postId",jwtauthMiddleware,getPostById);
router.post("/",jwtauthMiddleware,createPost);
router.put("/:id",jwtauthMiddleware,updatePost);
router.delete("/:id",jwtauthMiddleware,deletePost);

export default router;