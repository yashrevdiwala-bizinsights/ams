import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Manufacturer } from '@/types';
import axios from 'axios';

interface ManufacturerResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  manufacturerById: Manufacturer | null
}

const initialState: ManufacturerResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  manufacturerById: null,
};

export const fetchManufacturer = createAsyncThunk('manufacturer/fetchManufacturer', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/manufacturer/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchManufacturerByID = createAsyncThunk(
  'manufacturer/fetchManufacturerByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/manufacturer/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addManufacturer = createAsyncThunk(
  "manufacturer/addManufacturer",
  async (data: Omit<Manufacturer, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/manufacturer/add-data", data);
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

export const updateManufacturer = createAsyncThunk(
  'manufacturer/updateManufacturer',
  async (data: Manufacturer, { rejectWithValue }) => {
    try {
      const response = await api.post('/manufacturer/update-data', data);
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

export const deleteManufacturer = createAsyncThunk(
  'manufacturer/deleteManufacturer',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/manufacturer/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const manufacturerSlice = createSlice({
  name: 'manufacturer',
  initialState,
  reducers: {
    resetManufacturerState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchManufacturer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchManufacturer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchManufacturer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchManufacturerByID.pending, (state) => {
      state.loading = true;
      state.manufacturerById = null
    });
    builder.addCase(fetchManufacturerByID.fulfilled, (state, action) => {
      state.loading = false;
      state. manufacturerById = action.payload
    });
    builder.addCase(fetchManufacturerByID.rejected, (state) => {
      state.loading = false
      state.manufacturerById = null
    });

    builder.addCase(addManufacturer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addManufacturer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addManufacturer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateManufacturer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateManufacturer.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetManufacturerState } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
