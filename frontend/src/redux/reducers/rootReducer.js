// src/reducers/index.js

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export default rootReducer;
