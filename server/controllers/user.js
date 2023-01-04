import User from "../models/User.js";

//FETCH USER
export const getUser = async (req, res) => {
  
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(500).json({ user: user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//FETCH FRIENDS
export const getFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      //formats to send only neccessary data
      const formattedfriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );
      res.status(200).json({ friends: formattedfriends });
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//FRIEND OR UNFRIEND FRIENDS
export const addRemoveFriends = async (req, res) => {
 
  try {
    const { id } = req.params;
    const { friendsID } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendsID);
    if (user && friend) {
      if (user.friends.includes(friendsID)) {
        //**friendid is the each input which will be given to the function inside the filter method
        user.friends = user.friends.filter((friendid) => friendid != friendsID);
        friend.friends = friend.friends.filter((friendid) => friendid != id);
      } else {
        user.friends.push(friendsID);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();

      const friendList = await Promise.all(
        user.friends.map((friendId) => User.findById(friendId))
      );
      const formattedfriends = friendList.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );
      res.status(200).json(formattedfriends);
    } else {
      return res.status(404).send("User does not exist");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
