import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";

import logger from "redux-logger";

const rootReducer = combineReducers({
    user: userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
