import express from "express";
//post controllers
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likeDislikePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/getFeed", getFeedPosts);
router.get("/getUserPost/:userId", getUserPosts);
router.patch("/like/:id/:userId", likeDislikePost);
export default router;
