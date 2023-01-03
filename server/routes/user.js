import express from "express";
import { verify } from "../middleware/auth.js";
import { getUser, getFriends } from "../controllers/user.js";
const router = express.Router();

//READ
router.get("/:id", verify, getUser);
router.get("/:id/friends", verify, getFriends);

//UPDATE
//router.patch(":id/:friendsID",addRemoveFriends);

export default router;
