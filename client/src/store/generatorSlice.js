import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api/axiosInstance";

export const generateModulAjar = createAsyncThunk(
  "generator/generateModulAjar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/modul-ajar", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateLkpd = createAsyncThunk(
  "generator/generateLkpd",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/lkpd", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generatePresentasi = createAsyncThunk(
  "generator/generatePresentasi",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/presentasi", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateMateri = createAsyncThunk(
  "generator/generateMateri",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/materi", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateSoal = createAsyncThunk(
  "generator/generateSoal",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/soal", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateRubrik = createAsyncThunk(
  "generator/generateRubrik",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/rubrik", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateIceBreaking = createAsyncThunk(
  "generator/generateIceBreaking",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/ice-breaking", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateCurhat = createAsyncThunk(
  "generator/generateCurhat",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/generate/curhat", formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  result: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const generatorSlice = createSlice({
  name: "generator",
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Modul ajar slice
      .addCase(generateModulAjar.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateModulAjar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateModulAjar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan konten.";
      })
      // LKPD slice
      .addCase(generateLkpd.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateLkpd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateLkpd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan konten LKPD.";
      })
      // presentasi slice
      .addCase(generatePresentasi.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generatePresentasi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generatePresentasi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan konten presentasi.";
      })
      // materi slice
      .addCase(generateMateri.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateMateri.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateMateri.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan materi.";
      })
      // soal slice
      .addCase(generateSoal.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateSoal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateSoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan soal.";
      })
      // rubrik slice
      .addCase(generateRubrik.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateRubrik.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateRubrik.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan rubrik.";
      })
      // ice breaking slice
      .addCase(generateIceBreaking.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateIceBreaking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateIceBreaking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal menghasilkan ice breaking.";
      })
      // curhat slice
      .addCase(generateCurhat.pending, (state) => {
        state.status = "loading";
        state.result = "";
        state.error = null;
      })
      .addCase(generateCurhat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(generateCurhat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Gagal mengirim curhatan.";
      });
  },
});

export const { clearResult } = generatorSlice.actions;
export default generatorSlice.reducer;
