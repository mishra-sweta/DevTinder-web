import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return [];
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((u) => u._id !== action.payload);
      return newFeed;
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;
