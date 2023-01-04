import express from "express";
import { verify } from "../middleware/auth.js";
import { getUser, getFriends,addRemoveFriends } from "../controllers/user.js";

const router = express.Router();

//READ
router.get("/:id", verify, getUser);
router.get("/:id/friends", verify, getFriends);

//UPDATE
router.patch("/:id/:friendsID",verify,addRemoveFriends);

export default router;
