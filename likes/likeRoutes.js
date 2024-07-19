import express from "express";
import jwtauthMiddleware from "../middlewares/authmiddleware.js";
import { getLikesOnPost,toggleLikesOnPost } from "./likeController.js";

const router= express.Router();

router.get("/:id",jwtauthMiddleware,getLikesOnPost);
router.post("/toggle/:id",jwtauthMiddleware,toggleLikesOnPost);


export default router;