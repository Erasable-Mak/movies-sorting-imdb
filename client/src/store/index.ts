// index.ts
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';  // Correctly import ThunkDispatch from redux-thunk
import { taskReducer } from './reducers';
import { TaskActionTypes } from './actions';

// Define RootState to represent the entire Redux state structure
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch, the type for dispatch
export type AppDispatch = ThunkDispatch<RootState, undefined, TaskActionTypes>;  // Correctly type AppDispatch

// Correctly apply thunk middleware
export const store = createStore(
  taskReducer, 
  applyMiddleware(thunk) // Apply thunk middleware directly
);