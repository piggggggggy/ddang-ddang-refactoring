import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quests: [],
    region: {
        regionSi: "",
        regionGu: "",
        regionDong: "",
    },
};

const questSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        setQuest(state, action) {
            state.quests = action.payload.list;
            state.region = action.payload.region;
        },
    },
});

export const questActions = questSlice.actions;
export default questSlice;
