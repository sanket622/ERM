import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  totalEmployees: 0,
  totalEmployeesUsingEWA: 0,
  avgIncome: 0,
  avgEWAAmountDisbursed: 0,
  employeesWithDeliquencies: 0,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'employerAnalytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setAnalyticsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAnalyticsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAnalyticsData,
  setAnalyticsLoading,
  setAnalyticsError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;

const getToken = () => localStorage.getItem('accessToken');

export const fetchEmployerAnalytics = () => async (dispatch) => {
  dispatch(setAnalyticsLoading(true));
  try {
    const response = await axios.get(
      'https://api.earnplus.net/api/v1/employer/auth/getEmployerAnalytics',
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = response.data.data;
    dispatch(setAnalyticsData(data));
  } catch (err) {
    dispatch(setAnalyticsError(err.message));
  } finally {
    dispatch(setAnalyticsLoading(false));
  }
};
