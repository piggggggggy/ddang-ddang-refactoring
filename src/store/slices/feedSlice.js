import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feeds: [],
    comments: [],
};

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        getFeed(state, action) {
            state.feeds = action.payload.feeds;
        },
        writeComment(state, action) {
            console.log(action);
        },
    },
});

export const feedActions = feedSlice.actions;
export default feedSlice;
