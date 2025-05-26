// redux/payrollSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payrollData: [],
  loading: false,
  error: null,
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    fetchPayrollStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPayrollSuccess: (state, action) => {
      state.payrollData = action.payload;
      state.loading = false;
    },
    fetchPayrollFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addPayroll: (state, action) => {
      state.payrollData.push(action.payload);
    },
  },
});

export const { fetchPayrollStart, fetchPayrollSuccess, fetchPayrollFailure, addPayroll } = payrollSlice.actions;

export default payrollSlice.reducer;
