import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    _id: "",
    username: "",
    image_url: "",
    likes: [],
    dislikes: [],
    reviews: [],
    ratings: [],
    watchlist: [],
    isLogin: false,
  },
  reducers: {
    addLogin(state, action) {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.image_url = action.payload.image_url;
      state.likes = action.payload.likes;
      state.dislikes = action.payload.dislikes;
      state.reviews = action.payload.reviews;
      state.ratings = action.payload.ratings;
      state.watchlist = action.payload.watchlist;
      state.isLogin = true;
    },
    logout(state) {
      state._id = "";
      state.username = "";
      state.image_url = "";
      state.likes = [];
      state.dislikes = [];
      state.reviews = [];
      state.ratings = [];
      state.watchlist = [];
      state.isLogin = false;
    },
  },
});

export const loginAction = loginSlice.actions;
export default loginSlice;
