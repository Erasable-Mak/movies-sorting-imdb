// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming rootReducer.ts is in the same folder
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Uses localStorage by default
import { UserState } from './userSlice'; // Import UserState from userSlice

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage,  // Persist the store to localStorage
  whitelist: ['user'], // Only persist the user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Disable the serializable check for specific actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);  // Create the persistor

// Modify RootState to access the user slice with proper types
export type RootState = ReturnType<typeof store.getState> & {
  user: UserState; // Directly use UserState without PersistPartial
};

export type AppDispatch = typeof store.dispatch;

export default store;
