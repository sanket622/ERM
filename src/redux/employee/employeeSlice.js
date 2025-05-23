import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Access token from localStorage
const getToken = () => localStorage.getItem('accessToken');

// Fetch Countries
export const fetchCountries = createAsyncThunk(
  'employee/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://api.earnplus.net/api/v1/associate/location/getAllCountries',
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.data.map((country) => ({
        id: country.id,
        label: country.countryName,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch States by Country
export const fetchStates = createAsyncThunk(
  'employee/fetchStates',
  async (countryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.earnplus.net/api/v1/associate/location/getStatesByCountry/${countryId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.data.map((state) => ({
        id: state.id,
        label: state.stateName,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch Districts by State
export const fetchDistricts = createAsyncThunk(
  'employee/fetchDistricts',
  async (stateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.earnplus.net/api/v1/associate/location/getDistrictsByState/${stateId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.data.map((district) => ({
        id: district.id,
        label: district.districtName,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Submit Employee
export const submitEmployee = createAsyncThunk(
  'employee/submitEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://api.earnplus.net/api/v1/employer/auth/addEmployeeByEmployer',
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    countries: [],
    states: [],
    districts: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch States
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Districts
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Submit Employee
      .addCase(submitEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = employeeSlice.actions;
export default employeeSlice.reducer;
