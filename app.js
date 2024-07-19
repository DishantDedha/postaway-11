import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/database.config.js";
import userRoutes from "./src/Users/userRoutes.js";
import postRoutes from "./posts/postRoutes.js"
import commentsRoutes from "./comments/commentsRoutes.js"
import likeRoutes from "./likes/likeRoutes.js"
import friendsRoutes from "./freinds/friendsRoutes.js"
import otpRoutes from "./otp/otpRoutes.js"

dotenv.config();

const app=express();
connectToDatabase();

 
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentsRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/friends",friendsRoutes);
app.use("/api/otp",otpRoutes);

export default app;