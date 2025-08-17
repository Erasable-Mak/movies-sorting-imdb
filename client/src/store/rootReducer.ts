// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
