import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import emailAccessReducer from './usermanagement/emailAccessSlice';
import employeeReducer from './employee/employeeSlice';
import payrollReducer from './historicalpayroll/payrollSlice';
import cardReducer from './dashboardhome/cardSlice';
import employerProfileReducer from './dashboardhome/employerProfileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        emailAccess: emailAccessReducer,
        employee: employeeReducer,
        payroll: payrollReducer,
        employeeCard: cardReducer,
        employerProfile: employerProfileReducer,
    },
});
