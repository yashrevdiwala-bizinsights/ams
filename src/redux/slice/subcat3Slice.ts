import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubCat3 } from '@/types';
import axios from 'axios';

interface SubCat3Response {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  subcat3ById: SubCat3 | null
}

const initialState: SubCat3Response = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  subcat3ById: null,
};

export const fetchSubcat3 = createAsyncThunk('subcat/fetchSubcat3', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/subcat3/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchSubcat3ByID = createAsyncThunk(
  'subcat3/fetchSubcat3ByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat3/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addSubcat3 = createAsyncThunk(
  "subcat3/addSubcat3",
  async (data: Omit<SubCat3, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/subcat3/add-data", data);
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

export const updateSubcat3 = createAsyncThunk(
  'subcat3/updateSubcat3',
  async (data: SubCat3, { rejectWithValue }) => {
    try {
      const response = await api.post('/subcat3/update-data', data);
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

export const deleteSubcat3 = createAsyncThunk(
  'subcat3/deleteSubcat3',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat3/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const subcat3Slice = createSlice({
  name: 'subcat3',
  initialState,
  reducers: {
    resetSubcat3State: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcat3.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubcat3.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchSubcat3.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchSubcat3ByID.pending, (state) => {
      state.loading = true;
      state.subcat3ById = null
    });
    builder.addCase(fetchSubcat3ByID.fulfilled, (state, action) => {
      state.loading = false;
      state. subcat3ById = action.payload
    });
    builder.addCase(fetchSubcat3ByID.rejected, (state) => {
      state.loading = false
      state.subcat3ById = null
    });

    builder.addCase(addSubcat3.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addSubcat3.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addSubcat3.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateSubcat3.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateSubcat3.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateSubcat3.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetSubcat3State } = subcat3Slice.actions;
export default subcat3Slice.reducer;
