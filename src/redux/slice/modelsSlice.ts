import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Models } from '@/types';
import axios from 'axios';

interface ModelsResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  modelsById: Models | null
}

const initialState: ModelsResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  modelsById: null,
};

export const fetchModels = createAsyncThunk('models/fetchModels', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/models/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchModelsByID = createAsyncThunk(
  'models/fetchModelsByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/models/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addModels = createAsyncThunk(
  "models/addModels",
  async (data: Omit<Models, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/models/add-data", data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        });
      }
      return rejectWithValue({ message: "Unexpected error occurred" });
    }
  }
);

export const updateModels = createAsyncThunk(
  'models/updateModels',
  async (data: Models, { rejectWithValue }) => {
    try {
      const response = await api.post('/models/update-data', data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        });
      }
      return rejectWithValue({ message: 'Unexpected error', status: 500 });
    }
  }
);

export const deleteModels = createAsyncThunk(
  'models/deleteModels',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/models/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    resetModelsState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchModels.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchModels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchModelsByID.pending, (state) => {
      state.loading = true;
      state.modelsById = null
    });
    builder.addCase(fetchModelsByID.fulfilled, (state, action) => {
      state.loading = false;
      state. modelsById = action.payload
    });
    builder.addCase(fetchModelsByID.rejected, (state) => {
      state.loading = false
      state.modelsById = null
    });

    builder.addCase(addModels.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addModels.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addModels.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateModels.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateModels.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateModels.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetModelsState } = modelsSlice.actions;
export default modelsSlice.reducer;
