import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubCat2 } from '@/types';
import axios from 'axios';

interface SubCat2Response {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  subcat2ById: SubCat2 | null
}

const initialState: SubCat2Response = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  subcat2ById: null,
};

export const fetchSubcat2 = createAsyncThunk('subcat/fetchSubcat2', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/subcat2/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchSubcat2ByID = createAsyncThunk(
  'subcat2/fetchSubcat2ByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat2/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addSubcat2 = createAsyncThunk(
  "subcat2/addSubcat2",
  async (data: Omit<SubCat2, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/subcat2/add-data", data);
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

export const updateSubcat2 = createAsyncThunk(
  'subcat2/updateSubcat2',
  async (data: SubCat2, { rejectWithValue }) => {
    try {
      const response = await api.post('/subcat2/update-data', data);
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

export const deleteSubcat2 = createAsyncThunk(
  'subcat2/deleteSubcat2',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/subcat2/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const subcat2Slice = createSlice({
  name: 'subcat2',
  initialState,
  reducers: {
    resetSubcat2State: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcat2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubcat2.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchSubcat2.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchSubcat2ByID.pending, (state) => {
      state.loading = true;
      state.subcat2ById = null
    });
    builder.addCase(fetchSubcat2ByID.fulfilled, (state, action) => {
      state.loading = false;
      state. subcat2ById = action.payload
    });
    builder.addCase(fetchSubcat2ByID.rejected, (state) => {
      state.loading = false
      state.subcat2ById = null
    });

    builder.addCase(addSubcat2.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addSubcat2.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addSubcat2.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateSubcat2.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateSubcat2.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateSubcat2.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetSubcat2State } = subcat2Slice.actions;
export default subcat2Slice.reducer;
