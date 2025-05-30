import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const myRequestSlice = createSlice({
  name: 'myRequest',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMyRequestLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyRequestList: (state, action) => {
      state.list = action.payload;
    },
    setMyRequestError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMyRequestLoading,
  setMyRequestList,
  setMyRequestError,
} = myRequestSlice.actions;

export default myRequestSlice.reducer;

// ✅ Thunk to fetch tickets
export const fetchMyRequests = (enqueueSnackbar) => async (dispatch) => {
  try {
    dispatch(setMyRequestLoading(true));
    const res = await axios.get(`/api/v1/employer/auth/getTicketsByEmployer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    dispatch(setMyRequestList(res.data.data));
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to load requests';
    dispatch(setMyRequestError(msg));
    if (enqueueSnackbar) enqueueSnackbar(msg, { variant: 'error' });
  } finally {
    dispatch(setMyRequestLoading(false));
  }
};
