import User from "../models/User";

export const getUSer=async(req,res)=>{
   try {
    const {userId}=req.params;
    const user=await User.findById(userId);
    res.status(500).json({user:user});

   } catch (error) {
    res.status(404).json({error:error.message});
   }

} 

export const getFriends=async(req,res)=>{
    try {
        const {userId}=req.params;
        const user=await User.findById(userId);
        if(user){
            
        }
    } catch (error) {
        
    }
}