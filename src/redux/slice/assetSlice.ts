import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AssetForm, Assets } from '@/types';
import axios from 'axios';

interface AssetResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  assetById: Assets | null
}

const initialState: AssetResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  assetById: null,
};

export const fetchAsset = createAsyncThunk('asset/fetchAsset', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/asset/get-data', {page, limit, search})
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchAssetById = createAsyncThunk(
  'asset/fetchAssetById',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/asset/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addAsset = createAsyncThunk(
  "asset/addAsset",
  async (data: Omit<AssetForm, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/asset/add-data", data);
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

export const updateAsset = createAsyncThunk(
  'asset/updateAsset',
  async (
    payload: { id: number; newData: Omit<AssetForm, 'id'> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/asset/update-data', payload);
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

export const deleteAsset = createAsyncThunk(
  'asset/deleteAsset',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/asset/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    resetAssetState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAsset.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.total = action.payload.totalDataFound // important
    });
    builder.addCase(fetchAsset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchAssetById.pending, (state) => {  
      state.loading = true;
      state.assetById = null
    });
    builder.addCase(fetchAssetById.fulfilled, (state, action) => {
      state.loading = false;
      state. assetById = action.payload
    });
    builder.addCase(fetchAssetById.rejected, (state) => {
      state.loading = false
      state.assetById = null
    });

    builder.addCase(addAsset.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addAsset.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addAsset.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateAsset.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateAsset.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetAssetState } = assetSlice.actions;
export default assetSlice.reducer;
