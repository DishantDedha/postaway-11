import express from "express";
import jwtauthMiddleware from "../middlewares/authmiddleware.js";
import { getFriends,getPendingFriendRequests,toggleFriends,responseToFriendRequest,sendFriendRequest } from "./friendController.js";

const router= express.Router();



router.get("/get-friends/:userId",jwtauthMiddleware,getFriends);
router.get("/get-pending-requests",jwtauthMiddleware,getPendingFriendRequests);
router.post("/toggle-friendship/:friendId",jwtauthMiddleware,toggleFriends)
router.post("/response-to-request/:friendId",jwtauthMiddleware,responseToFriendRequest);
router.post("/send-friend-request/:friendId",jwtauthMiddleware,sendFriendRequest);


export default router;

