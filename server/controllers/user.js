import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(500).json({ user: user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

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
          return{
          _id, firstName, lastName, occupation, location, picturePath};
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
