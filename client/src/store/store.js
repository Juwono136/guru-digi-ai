import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import generatorReducer from "./generatorSlice";

/*
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn', 'user']
};
*/

const rootReducer = combineReducers({
  auth: authReducer,
  generator: generatorReducer,
});

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["generator", "auth"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
