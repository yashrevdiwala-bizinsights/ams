import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubCat1 } from '@/types';
import axios from 'axios';

interface Subcat1Response {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  subcat1ById: SubCat1 | null
}

const initialState: Subcat1Response = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  subcat1ById: null,
};

export const fetchSubcat1 = createAsyncThunk('subcat1/fetchSubcat1', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/subcat1/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchSubcat1ByID = createAsyncThunk(
  'subcat1/fetchSubcat1ByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat1/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addSubcat1 = createAsyncThunk(
  "subcat1/addSubcat1",
  async (data: Omit<SubCat1, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/subcat1/add-data", data);
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

export const updateSubcat1 = createAsyncThunk(
  'subcat1/updateSubcat1',
  async (data: SubCat1, { rejectWithValue }) => {
    try {
      const response = await api.post('/subcat1/update-data', data);
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

export const deleteSubcat1 = createAsyncThunk(
  'subcat1/deleteSubcat1',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat1/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const subcat1Slice = createSlice({
  name: 'subcat1',
  initialState,
  reducers: {
    resetSubcat1State: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcat1.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubcat1.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchSubcat1.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchSubcat1ByID.pending, (state) => {
      state.loading = true;
      state.subcat1ById = null
    });
    builder.addCase(fetchSubcat1ByID.fulfilled, (state, action) => {
      state.loading = false;
      state. subcat1ById = action.payload
    });
    builder.addCase(fetchSubcat1ByID.rejected, (state) => {
      state.loading = false
      state.subcat1ById = null
    });

    builder.addCase(addSubcat1.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addSubcat1.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addSubcat1.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateSubcat1.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateSubcat1.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateSubcat1.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetSubcat1State } = subcat1Slice.actions;
export default subcat1Slice.reducer;
