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

// --- LANGKAH 1: HAPUS ATAU KOMENTARI KONFIGURASI INI ---
/*
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn', 'user']
};
*/

// --- LANGKAH 2: UBAH 'auth' AGAR TIDAK MENGGUNAKAN persistReducer ---
const rootReducer = combineReducers({
  // HAPUS 'persistReducer(authPersistConfig, ...)'
  auth: authReducer,
  generator: generatorReducer,
});

// --- LANGKAH 3: TAMBAHKAN 'auth' KE DALAM BLACKLIST ---
const rootPersistConfig = {
  key: "root",
  storage,
  // Tambahkan 'auth' di sini untuk memastikan
  // slice ini tidak pernah disimpan ke localStorage.
  blacklist: ["generator", "auth"],
};

// Kode di bawah ini tetap sama
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
