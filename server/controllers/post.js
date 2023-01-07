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


export const getFeedPosts=async(req,res)=>{
  try {
    const posts=await Post.find();
    if(posts){
      res.status(200).json(posts);
    }
    else{
      res.status(404).json({message:"no posts were found"});
    }
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
}