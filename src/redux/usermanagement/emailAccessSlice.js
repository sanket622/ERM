import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    roleType: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    roleAccess: [],
  },
  errors: {},
};

const emailAccessSlice = createSlice({
  name: 'emailAccess',
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setRoleType(state, action) {
      state.formData.roleType = action.payload;
      state.formData.roleAccess = [];
    },
    setRoleAccess(state, action) {
      state.formData.roleAccess = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
      state.errors = {};
    },
  },
});

export const {
  updateField,
  setRoleType,
  setRoleAccess,
  setErrors,
  resetForm,
} = emailAccessSlice.actions;

export default emailAccessSlice.reducer;
