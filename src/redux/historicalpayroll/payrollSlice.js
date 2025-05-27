// redux/payrollSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  total: 0,
  page: 1,
  limit: 10,
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    setPayrollData: (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    addPayrollEntry: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setPayrollData, addPayrollEntry } = payrollSlice.actions;

export const fetchPayrollData = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await axios.get('/api/v1/employee/payroll/getHistoricalPayrolls', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(setPayrollData(res.data.data));
  } catch (err) {
    console.error('Error fetching payroll data:', err);
  }
};

export const createPayrollEntry = (body, onSuccess) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const res = await axios.post('https://api.earnplus.net/api/v1/employee/payroll/createEmployeeHistoricalPayroll', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      dispatch(addPayrollEntry(body));
      onSuccess?.();
    }
  } catch (err) {
    console.error('Error creating payroll entry:', err);
  }
};

export default payrollSlice.reducer;
