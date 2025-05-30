import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'helpdeskTicket',
  initialState,
  reducers: {
    setTicketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTicketSuccess: (state, action) => {
      state.success = action.payload;
    },
    setTicketError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTicketLoading,
  setTicketSuccess,
  setTicketError,
} = ticketSlice.actions;

export default ticketSlice.reducer;

const getToken = () => localStorage.getItem('accessToken');

export const submitHelpdeskTicket = (ticketData, enqueueSnackbar) => async (dispatch) => {
    dispatch(setTicketLoading(true));
    dispatch(setTicketSuccess(false));
    dispatch(setTicketError(null));
  
    try {
      await axios.post(
        'https://api.earnplus.net/api/v1/employer/auth/createEmployerTicket',
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      dispatch(setTicketSuccess(true));
      enqueueSnackbar('Ticket submitted successfully!', { variant: 'success' });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(setTicketError(message));
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
  