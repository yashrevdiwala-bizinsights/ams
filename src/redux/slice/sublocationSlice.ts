import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubLocation } from '@/types';
import axios from 'axios';

interface SubLocationResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  sublocationById: SubLocation | null
}

const initialState: SubLocationResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  sublocationById: null,
};

export const fetchSubLocation = createAsyncThunk('sublocation/fetchSubLocation', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/sublocation/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchSubLocationById = createAsyncThunk(
  'sublocation/fetchSubLocationById',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/sublocation/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addSubLocation = createAsyncThunk(
  "sublocation/addSubLocation",
  async (data: Omit<SubLocation, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/sublocation/add-data", data);
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

export const updateSubLocation = createAsyncThunk(
  'sublocation/updateSubLocation',
  async (data: SubLocation, { rejectWithValue }) => {
    try {
      const response = await api.post('/sublocation/update-data', data);
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

export const deleteSubLocation = createAsyncThunk(
  'sublocation/deleteSubLocation',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/sublocation/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const sublocationSlice = createSlice({
  name: 'sublocation',
  initialState,
  reducers: {
    resetSubLocationState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchSubLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchSubLocationById.pending, (state) => {
      state.loading = true;
      state.sublocationById = null
    });
    builder.addCase(fetchSubLocationById.fulfilled, (state, action) => {
      state.loading = false;
      state. sublocationById = action.payload
    });
    builder.addCase(fetchSubLocationById.rejected, (state) => {
      state.loading = false
      state.sublocationById = null
    });

    builder.addCase(addSubLocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addSubLocation.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addSubLocation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateSubLocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateSubLocation.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateSubLocation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetSubLocationState } = sublocationSlice.actions;
export default sublocationSlice.reducer;
