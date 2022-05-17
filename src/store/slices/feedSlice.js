import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feeds: [],
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        getFeed(state, action) {
            state.feeds = [...state.feeds, ...action.payload.feeds];
        },
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice;
