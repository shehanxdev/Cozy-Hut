//MODELS
import User from "../models/User.js";
import Post from "./../models/Post.js";
//MODULES
import { faker } from "@faker-js/faker";
import { mongoose } from "mongoose";

export const generateUsers = (number) => {
  let users = [];
  for (let i = 0; i < number; ++i) {
    users.push(
      new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password:
          "$2b$10$tYcXuiUfjxod0C4FasleR.0NB2PRwMVAqqbVYM5To67Os7reozJBq", //password is password
        picturePath: "null",
        friends: [],
        location: faker.address.county(),
        occupation: "null",
        viewedProfile: 0,
        impressions: 0,
      })
    );
  }
  return users;
};

export const generatePosts = async (number) => {
  return new Promise(async (resolve, reject) => {
    try {
      var posts = [];
      for (let i = 0; i < number; ++i) {
        const userId = faker.helpers.arrayElement([
          "63ba7049f14355636a5ff15a",
          "63ba7049f14355636a5ff159",
          "63ba7049f14355636a5ff158",
          "63ba6fee1364a887bf74dbf7",
          "63ba6fee1364a887bf74dbf8",
          "63ba6fee1364a887bf74dbf9",
        ]);
        const user = await User.findById(userId);
        const post = new Post({
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          description: faker.lorem.paragraph(1),
          picturepath: "null",
          userPicturePath: "null",
          likes: {},
          comments: [],
        });

        posts.push(post);
      }

      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};
