import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OSType } from '@/types';
import axios from 'axios';

interface OSResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  osById: OSType | null
}

const initialState: OSResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  osById: null,
};

export const fetchOS = createAsyncThunk('os/fetchOS', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/os/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchOSByID = createAsyncThunk(
  'os/fetchOSByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/os/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addOS = createAsyncThunk(
  "os/addOS",
  async (data: Omit<OSType, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/os/add-data", data);
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

export const updateOS = createAsyncThunk(
  'os/updateOS',
  async (data: OSType, { rejectWithValue }) => {
    try {
      const response = await api.post('/os/update-data', data);
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

export const deleteOS = createAsyncThunk(
  'os/deleteOS',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/os/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const osSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    resetOsState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOS.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOS.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchOS.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchOSByID.pending, (state) => {
      state.loading = true;
      state.osById = null
    });
    builder.addCase(fetchOSByID.fulfilled, (state, action) => {
      state.loading = false;
      state. osById = action.payload
    });
    builder.addCase(fetchOSByID.rejected, (state) => {
      state.loading = false
      state.osById = null
    });

    builder.addCase(addOS.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addOS.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addOS.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateOS.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateOS.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateOS.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetOsState } = osSlice.actions;
export default osSlice.reducer;
