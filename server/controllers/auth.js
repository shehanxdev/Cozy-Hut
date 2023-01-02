import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./../models/User.js";

//REGISTERING CONTROLLER
export const register = async (req, res) => {
  
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends, 
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });
    
   
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


//LOGIN IN CONTROLLER
export const login=async (req,res)=>{
  try {
    const {password,email}=req.body;
  const user=await User.findOne({email:email});

  if(!user){
    return res.status(400).json({ msg: "User does not exist" });
  }

  const isMatch=await bcrypt.compare(password,user.password);
  console.log(isMatch);

  if(!isMatch){
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token=Jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'20d'});
  delete user.password;
  res.status(200).json({token,user});
  } catch (error) {
    res.status(500).json({error:error});
  }
}