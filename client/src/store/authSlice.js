import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { auth as firebaseAuth } from "../firebase.config";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import api from "../api/axiosInstance";

export const loginWithPassword = createAsyncThunk(
  "auth/loginWithPassword",
  async (password, { rejectWithValue }) => {
    try {
      const response = await api.post("/login/password", { password });
      return {
        name: "Guest",
        photoURL: null,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const loginWithGoogle = createAsyncThunk(
//   "auth/loginWithGoogle",
//   async (_, { rejectWithValue }) => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(firebaseAuth, provider);
//       return {
//         name: result.user.displayName,
//         photoURL: result.user.photoURL,
//       };
//     } catch (error) {
//       return rejectWithValue({ message: error.code || error.message });
//     }
//   }
// );

const initialState = {
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

// 4. Buat Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // if (firebaseAuth.currentUser) {
      //   firebaseAuth.signOut();
      // }
      state.isLoggedIn = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login dengan password slice
      .addCase(loginWithPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name,
          photoURL: action.payload.photoURL,
        };
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.error = action.payload.message || "Password salah.";
      });
    // Login dengan google slice
    // .addCase(loginWithGoogle.pending, (state) => {
    //   state.status = "loading";
    //   state.error = null;
    // })
    // .addCase(loginWithGoogle.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.isLoggedIn = true;
    //   state.user = {
    //     name: action.payload.name,
    //     photoURL: action.payload.photoURL,
    //   };
    // })
    // .addCase(loginWithGoogle.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.isLoggedIn = false;
    //   state.error = action.payload.message || "Gagal login dengan Google.";
    // });
  },
});

export const { logout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
