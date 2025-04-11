import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Processor } from '@/types';
import axios from 'axios';

interface ProcessorResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  processorById: Processor | null
}

const initialState: ProcessorResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  processorById: null,
};

export const fetchProcessor = createAsyncThunk('processor/fetchProcessor', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/processor/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchProcessorByID = createAsyncThunk(
  'processor/fetchProcessorByID',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/processor/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addProcessor = createAsyncThunk(
  "processor/addProcessor",
  async (data: Omit<Processor, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/processor/add-data", data);
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

export const updateProcessor = createAsyncThunk(
  'processor/updateProcessor',
  async (data: Processor, { rejectWithValue }) => {
    try {
      const response = await api.post('/processor/update-data', data);
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

export const deleteProcessor = createAsyncThunk(
  'processor/deleteProcessor',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/processor/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const processorSlice = createSlice({
  name: 'processor',
  initialState,
  reducers: {
    resetprocessorState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProcessor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProcessor.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchProcessor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchProcessorByID.pending, (state) => {
      state.loading = true;
      state.processorById = null
    });
    builder.addCase(fetchProcessorByID.fulfilled, (state, action) => {
      state.loading = false;
      state. processorById = action.payload
    });
    builder.addCase(fetchProcessorByID.rejected, (state) => {
      state.loading = false
      state.processorById = null
    });

    builder.addCase(addProcessor.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addProcessor.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addProcessor.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateProcessor.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateProcessor.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateProcessor.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetprocessorState } = processorSlice.actions;
export default processorSlice.reducer;
