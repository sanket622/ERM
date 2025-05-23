import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import emailAccessReducer from './usermanagement/emailAccessSlice';
import employeeReducer from './employee/employeeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        emailAccess: emailAccessReducer,
        employee: employeeReducer,
    },
});
