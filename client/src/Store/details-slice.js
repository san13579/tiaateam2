import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    _id: "",
    title: "",
    image_url: "",
    trailer_url: "",
    actor: [],
    actress: [],
    description: "",
    releaseDate: "",
    movie_duration: "",
    budget: "",
    official_collection: "",
    likes: 0,
    dislikes: 0,
    ratings: [],
    awards: [],
    tags: [],
    directors: [],
    genre: [],
    reviews: [],
  },
  reducers: {
    addDetails(state, action) {
      state._id = action.payload._id;
      state.title = action.payload.title;
      state.image_url = action.payload.image_url;
      state.trailer_url = action.payload.trailer_url;
      state.actor = action.payload.actor;
      state.actress = action.payload.actress;
      state.description = action.payload.description;
      state.releaseDate = action.payload.releaseDate;
      state.movie_duration = action.payload.movie_duration;
      state.budget = action.payload.budget;
      state.official_collection = action.payload.official_collection;
      state.likes = action.payload.likes;
      state.dislikes = action.payload.dislikes;
      state.ratings = action.payload.ratings;
      state.awards = action.payload.awards;
      state.tags = action.payload.tags;
      state.directors = action.payload.directors;
      state.genre = action.payload.genre;
      state.reviews = action.payload.reviews;
    },
    removeDetails(state) {
      state._id = "";
      state.title = "";
      state.image_url = "";
      state.trailer_url = "";
      state.actor = "";
      state.actress = "";
      state.description = "";
      state.releaseDate = "";
      state.movie_duration = "";
      state.budget = "";
      state.official_collection = "";
      state.likes = 0;
      state.dislikes = 0;
      state.ratings = [];
      state.awards = [];
      state.tags = [];
      state.directors = [];
      state.genre = [];
      state.reviews = [];
    },
  },
});

export const detailsAction = detailsSlice.actions;
export default detailsSlice;
