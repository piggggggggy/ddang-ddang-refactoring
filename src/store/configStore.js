import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import feedSlice from "./slices/feedSlice";

import logger from "redux-logger";
import questSlice from "./slices/questSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    feed: feedSlice.reducer,
    quest: questSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
