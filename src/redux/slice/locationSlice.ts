import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocationType } from '@/types';
import axios from 'axios';

interface LocationResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: [] | null;
  total: number;
  locationById: LocationType | null
}

const initialState: LocationResponse = {
  loading: false,
  error: null,
  success: false,
  data: null,
  total: 0,
  locationById: null,
};

export const fetchLocation = createAsyncThunk('location/fetchLocation', async  ({ page, limit, search }: { page: number; limit: number; search: string }, { rejectWithValue }) => {
  return api
    .post('/location/get-data', {page, limit, search})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const fetchLocationById = createAsyncThunk(
  'location/fetchLocationById',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/location/get-data-by-id', {id})
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const addLocation = createAsyncThunk(
  "location/addLocation",
  async (data: Omit<LocationType, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/location/add-data", data);
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

export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (data: LocationType, { rejectWithValue }) => {
    try {
      const response = await api.post('/location/update-data', data);
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

export const deleteLocation = createAsyncThunk(
  'location/deleteLocation',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/location/delete-data', { id: id })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    resetLocationState: (state) => {
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.totalDataFound 
    });
    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchLocationById.pending, (state) => {
      state.loading = true;
      state.locationById = null
    });
    builder.addCase(fetchLocationById.fulfilled, (state, action) => {
      state.loading = false;
      state. locationById = action.payload
    });
    builder.addCase(fetchLocationById.rejected, (state) => {
      state.loading = false
      state.locationById = null
    });

    builder.addCase(addLocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(addLocation.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addLocation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });

    builder.addCase(updateLocation.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateLocation.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    });
  },
});

export const { resetLocationState } = locationSlice.actions;
export default locationSlice.reducer;
