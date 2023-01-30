import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    user: null,
    mode: "light",
    token: null,
    posts: [],
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode == "light" ? "dark" : "light";
    },
    setLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoggedOut: (state) => {
      (state.user = null), (state.token = null);
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User is not loggedin");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id == action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLoggedIn,
  setLoggedOut,
  setFriends,
  setPosts,
  setPost,
} = stateSlice.actions;
export default stateSlice.reducer;
