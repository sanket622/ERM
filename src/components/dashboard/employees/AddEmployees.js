import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, Box } from "@mui/material";
import { Person, AccountBalance } from "@mui/icons-material";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import TextFieldComponent from "../../subcompotents/TextFieldComponent";
import AutocompleteFieldComponent from "../../subcompotents/AutocompleteFieldComponent";
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchCountries,
    fetchStates,
    fetchDistricts,
    fetchWorkLocations,
    fetchContractTypes,
    fetchPaymentCyclesByContractType,
    submitEmployee,
    updateFormField,
    resetForm,
    setErrors,
} from '../../../redux/employee/employeeSlice';

import { enqueueSnackbar } from "notistack";

const AddEmployees = () => {
    const dispatch = useDispatch();
    const {
        formData,
        countries,
        states,
        districts,
        workLocations,
        contractTypes,
        paymentCycles,
        errors,
        loading
    } = useSelector((state) => state.employee);

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchWorkLocations());
        dispatch(fetchContractTypes());
    }, [dispatch]);

    useEffect(() => {
        if (formData.country?.id) {
            dispatch(fetchStates(formData.country.id));
        }
    }, [formData.country, dispatch]);

    useEffect(() => {
        if (formData.state?.id) {
            dispatch(fetchDistricts(formData.state.id));
        }
    }, [formData.state, dispatch]);

    useEffect(() => {
        if (formData.contractType?.id) {
            dispatch(fetchPaymentCyclesByContractType(formData.contractType.id));
        }
    }, [formData.contractType, dispatch]);

    const handleChange = (field, value) => {
        dispatch(updateFormField({ field, value }));
        if (errors[field]) {
            dispatch(setErrors({ ...errors, [field]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (tabIndex === 0) {
            if (!formData.firstName?.trim()) newErrors.firstName = 'First Name is required';
            if (!formData.lastName?.trim()) newErrors.lastName = 'Last Name is required';
            if (!formData.mobile?.trim()) newErrors.mobile = 'Mobile Number is required';
            if (!formData.email?.trim()) newErrors.email = 'Email Address is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid Email';
            if (!formData.dob) newErrors.dob = 'Date of Birth is required';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.country) newErrors.country = 'Country is required';
            if (!formData.state) newErrors.state = 'State is required';
            if (!formData.city) newErrors.city = 'City is required';
            if (!formData.nationality?.trim()) newErrors.nationality = 'Nationality is required';
            if (!formData.panNo?.trim()) newErrors.panNo = 'PAN Number is required';
            else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) newErrors.panNo = 'Invalid PAN Number';
            if (!formData.aadharNo?.trim()) newErrors.aadharNo = 'Aadhaar Number is required';
            else if (!/^\d{12}$/.test(formData.aadharNo)) newErrors.aadharNo = 'Invalid Aadhaar Number';
            if (!formData.address?.trim()) newErrors.address = 'Address is required';
            if (!formData.pincode?.trim()) newErrors.pincode = 'Zip code is required';
        }

        if (tabIndex === 1) {
            if (!formData.employeeId?.trim()) newErrors.employeeId = 'Employee ID is required';
            if (!formData.dateJoined) newErrors.dateJoined = 'Date of Joining is required';
            if (!formData.jobTitle?.trim()) newErrors.jobTitle = 'Job Title is required';
            if (!formData.department?.trim()) newErrors.department = 'Department is required';
            if (!formData.workLocation) newErrors.workLocation = 'Work Location is required';
            if (!formData.contractType) newErrors.contractType = 'Contract Type is required';
            if (formData.contractType?.value === 'type 1' && !formData.monthlySalary?.trim()) newErrors.monthlySalary = 'Monthly Salary is required';
            if (!formData.paymentCycle) newErrors.paymentCycle = 'Payment Cycle is required';
        }

        if (tabIndex === 2) {
            if (!formData.accName?.trim()) newErrors.accName = 'Account Holder Name is required';
            if (!formData.accNumber?.trim()) newErrors.accNumber = 'Account Number is required';
            if (!formData.bankName?.trim()) newErrors.bankName = 'Bank Name is required';
            if (!formData.ifsc?.trim()) newErrors.ifsc = 'IFSC Code is required';
            else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) newErrors.ifsc = 'Invalid IFSC Code';
        }

        dispatch(setErrors(newErrors));
        return Object.keys(newErrors).length === 0;
    };

    const handleTabChange = (_, newValue) => {
        if (newValue > tabIndex) {
            if (!validate()) return;
        }
        setTabIndex(newValue);
    };

    const handleSubmit = async () => {
        if (!validate()) {
            enqueueSnackbar('Please fix validation errors before submitting.', { variant: 'error' });
            return;
        }
    
        try {
            const response = await dispatch(submitEmployee(formData)); // no .unwrap()
            const data = response?.payload;
    
            if (data?.success) {
                enqueueSnackbar(data?.message || 'Employee added successfully!', { variant: 'success' });
                setTabIndex(0);         
                dispatch(resetForm()); 
            } else {
                enqueueSnackbar(`Failed to add employee: ${data?.message || 'Unknown error'}`, { variant: 'error' });
            }
        } catch (err) {
            const message = typeof err === 'string' ? err : err?.message || 'Unknown error';
            enqueueSnackbar(`Failed to add employee: ${message}`, { variant: 'error' });
        }
    };
    
    return (
        <div className="max-w-6xl mt-16">
            <p className="text-[24px] font-semibold">Add Employees</p>
            <div className="bg-white rounded-xl border p-6 mt-6">
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="inherit"
                    indicatorColor="primary"
                    className="border-b"
                    sx={{
                        '& .MuiTab-root': { color: '#000' },
                        '& .Mui-selected': { color: '#4B5563' },
                        '& .MuiTabs-indicator': { backgroundColor: '#4B5563' }
                    }}>
                    <Tab icon={<Person />} iconPosition="start" label="Personal Information" />
                    <Tab icon={<BusinessCenterOutlinedIcon />} iconPosition="start" label="Employment Details" />
                    <Tab icon={<AccountBalance />} iconPosition="start" label="Bank Details" />
                </Tabs>

                {tabIndex === 0 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent
                            label="First Name"
                            value={formData.firstName}
                            onChange={e => handleChange('firstName', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                        <TextFieldComponent
                            label="Last Name"
                            value={formData.lastName}
                            onChange={e => handleChange('lastName', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                        <TextFieldComponent
                            label="Mobile Number"
                            value={formData.mobile}
                            onChange={e => handleChange('mobile', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.mobile}
                            helperText={errors.mobile}
                        />
                        <TextFieldComponent
                            label="Email Address"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextFieldComponent
                            label="Date of Birth"
                            type="date"
                            value={formData.dob}
                            onChange={e => handleChange('dob', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth size="small"
                            error={!!errors.dob}
                            helperText={errors.dob}
                        />
                        <AutocompleteFieldComponent
                            label="Marital Status (optional)"
                            value={formData.maritalStatus}
                            onChange={val => handleChange('maritalStatus', val)}
                            options={[
                                { label: "Single", value: "Single" },
                                { label: "Married", value: "Married" }
                            ]}
                        />
                        <AutocompleteFieldComponent
                            label="Gender"
                            value={formData.gender}
                            onChange={val => handleChange('gender', val)}
                            options={[
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                                { label: "Other", value: "Other" }
                            ]}
                            error={!!errors.gender}
                            helperText={errors.gender}
                        />
                        <TextFieldComponent
                            label="Nationality"
                            value={formData.nationality}
                            onChange={e => handleChange('nationality', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.nationality}
                            helperText={errors.nationality}
                        />
                        <TextFieldComponent
                            label="PAN Number"
                            value={formData.panNo}
                            onChange={e => handleChange('panNo', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.panNo}
                            helperText={errors.panNo}
                        />
                        <TextFieldComponent
                            label="Aadhaar Number"
                            value={formData.aadharNo}
                            onChange={e => handleChange('aadharNo', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.aadharNo}
                            helperText={errors.aadharNo}
                        />
                        <TextFieldComponent
                            label="Address"
                            value={formData.address}
                            onChange={e => handleChange('address', e.target.value)}
                            fullWidth multiline rows={2} size="small" className="md:col-span-2"
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                        <AutocompleteFieldComponent
                            label="Country"
                            value={formData.country}
                            onChange={val => handleChange('country', val)}
                            options={countries}
                            error={!!errors.country}
                            helperText={errors.country}
                        />
                        <AutocompleteFieldComponent
                            label="State"
                            value={formData.state}
                            onChange={val => handleChange('state', val)}
                            options={states}
                            error={!!errors.state}
                            helperText={errors.state}
                        />
                        <AutocompleteFieldComponent
                            label="City"
                            value={formData.city}
                            onChange={val => handleChange('city', val)}
                            options={districts}
                            error={!!errors.city}
                            helperText={errors.city}
                        />
                        <TextFieldComponent
                            label="Zip code"
                            value={formData.pincode}
                            onChange={e => handleChange('pincode', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.pincode}
                            helperText={errors.pincode}
                        />
                    </form>
                )}

                {tabIndex === 1 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent
                            label="Employee ID"
                            value={formData.employeeId}
                            onChange={e => handleChange('employeeId', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.employeeId}
                            helperText={errors.employeeId}
                        />
                        <TextFieldComponent
                            label="Date of Joining"
                            type="date"
                            value={formData.dateJoined}
                            onChange={e => handleChange('dateJoined', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth size="small"
                            error={!!errors.dateJoined}
                            helperText={errors.dateJoined}
                        />
                        <TextFieldComponent
                            label="Job Title"
                            value={formData.jobTitle}
                            onChange={e => handleChange('jobTitle', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.jobTitle}
                            helperText={errors.jobTitle}
                        />
                        <TextFieldComponent
                            label="Department"
                            value={formData.department}
                            onChange={e => handleChange('department', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.department}
                            helperText={errors.department}
                        />
                        <AutocompleteFieldComponent
                            label="Work Location"
                            value={formData.workLocation}
                            onChange={val => handleChange('workLocation', val)}
                            options={workLocations}
                            error={!!errors.workLocation}
                            helperText={errors.workLocation}
                        />
                        <AutocompleteFieldComponent
                            label="Contract Type"
                            value={formData.contractType}
                            onChange={val => handleChange('contractType', val)}
                            options={contractTypes}
                            error={!!errors.contractType}
                            helperText={errors.contractType}
                        />
                        {formData.contractType?.value === 'type 1' && (
                            <TextFieldComponent
                                label="Monthly Salary"
                                value={formData.monthlySalary}
                                onChange={e => handleChange('monthlySalary', e.target.value)}
                                fullWidth size="small"
                                error={!!errors.monthlySalary}
                                helperText={errors.monthlySalary}
                            />
                        )}
                        <AutocompleteFieldComponent
                            label="Payment Cycle"
                            value={formData.paymentCycle}
                            onChange={val => handleChange('paymentCycle', val)}
                            options={paymentCycles}
                            error={!!errors.paymentCycle}
                            helperText={errors.paymentCycle}
                        />
                    </form>
                )}

                {tabIndex === 2 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent
                            label="Account Holder Name"
                            value={formData.accName}
                            onChange={e => handleChange('accName', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.accName}
                            helperText={errors.accName}
                        />
                        <TextFieldComponent
                            label="Account Number"
                            value={formData.accNumber}
                            onChange={e => handleChange('accNumber', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.accNumber}
                            helperText={errors.accNumber}
                        />
                        <TextFieldComponent
                            label="Bank Name"
                            value={formData.bankName}
                            onChange={e => handleChange('bankName', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.bankName}
                            helperText={errors.bankName}
                        />
                        <TextFieldComponent
                            label="IFSC Code"
                            value={formData.ifsc}
                            onChange={e => handleChange('ifsc', e.target.value)}
                            fullWidth size="small"
                            error={!!errors.ifsc}
                            helperText={errors.ifsc}
                        />
                    </form>
                )}

                <Box className="flex justify-end mt-6 space-x-4">
                    {tabIndex > 0 && (
                        <Button
                            variant="outlined"
                            onClick={() => setTabIndex(tabIndex - 1)}
                            sx={{
                                width: '15%',
                                py: 1,
                                borderRadius: 3,
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {tabIndex < 2 && (
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (validate()) {
                                    setTabIndex(tabIndex + 1);
                                } else {
                                    enqueueSnackbar('Please fill all required fileds before proceeding.', { variant: 'error' });
                                }
                            }}
                            sx={{
                                width: '15%',
                                py: 1,
                                backgroundColor: '#4B5563',
                                borderRadius: 3,
                                '&:hover': { backgroundColor: '#4B5563' },
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {tabIndex === 2 && (
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                width: '15%',
                                py: 1,
                                backgroundColor: '#4B5563',
                                borderRadius: 3,
                                '&:hover': { backgroundColor: '#4B5563' },
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </Box>

            </div>
        </div>
    );
};

export default AddEmployees;
