import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { userId, picturePath, description } = req.body;
    const user = await User.findById(userId);
    if (user) {
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.userPicturePath,
        picturePath,
        likes: {},
        comments: [],
      });

      const savedPost = await newPost.save();
      if (savedPost) {
        res.status(201).json(savedPost);
      } else {
        res.status(500).send("Database error");
      }
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "no posts were found" });
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.fint({ userId });
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).send("User has not posted anything");
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

export const likeDislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("No post was found");
    }
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
