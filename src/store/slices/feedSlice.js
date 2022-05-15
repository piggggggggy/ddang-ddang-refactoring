import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feed: null,
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        getFeed(state, action) {
            state.feed = { ...state.feed, ...action.payload.feed };
        },
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice;
