import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, Box } from "@mui/material";
import { Person, AccountBalance } from "@mui/icons-material";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import TextFieldComponent from "../../subcompotents/TextFieldComponent";
import AutocompleteFieldComponent from "../../subcompotents/AutocompleteFieldComponent";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchStates, fetchDistricts } from '../../../redux/employee/employeeSlice';
import { submitEmployee } from '../../../redux/employee/employeeSlice';


const AddEmployees = () => {
    const dispatch = useDispatch();
    const { countries, states, districts } = useSelector((state) => state.employee);

    const [tabIndex, setTabIndex] = useState(0);

    // Personal Info
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        dob: '',
        maritalStatus: null,
        gender: null,
        nationality: '',
        panNo: '',
        aadharNo: '',
        address: '',
        country: null,
        state: null,
        city: null,
        pincode: '',

        // Employment
        employeeId: '',
        dateJoined: '',
        jobTitle: '',
        department: '',
        workLocation: '',
        contractType: null,
        monthlySalary: '',
        paymentCycle: '',

        // Bank
        accName: '',
        accNumber: '',
        bankName: '',
        ifsc: '',
    });

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        if (formData.country?.id) {
            dispatch(fetchStates({ countryId: formData.country.id }));
        }
    }, [formData.country, dispatch]);

    useEffect(() => {
        if (formData.state?.id) {
            dispatch(fetchDistricts({ stateId: formData.state.id }));
        }
    }, [formData.state, dispatch]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    const handleSubmit = () => {
       dispatch(submitEmployee(formData));

    };

    return (
        <div className="max-w-6xl mt-16">
            <p className="text-[24px] font-semibold">Add Employees</p>
            <div className="bg-white rounded-xl border p-6 mt-6">
                <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth"
                    textColor="inherit" indicatorColor="primary"
                    className="border-b"
                    sx={{
                        '& .MuiTab-root': { color: '#000' },
                        '& .Mui-selected': { color: '#0000FF' },
                        '& .MuiTabs-indicator': { backgroundColor: '#0000FF' }
                    }}>
                    <Tab icon={<Person />} iconPosition="start" label="Personal Information" />
                    <Tab icon={<BusinessCenterOutlinedIcon />} iconPosition="start" label="Employment Details" />
                    <Tab icon={<AccountBalance />} iconPosition="start" label="Bank Details" />
                </Tabs>

                {tabIndex === 0 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent label="First Name" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Last Name" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Mobile Number" value={formData.mobile} onChange={e => handleChange('mobile', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Email Address" value={formData.email} onChange={e => handleChange('email', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Date of Birth" type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} InputLabelProps={{ shrink: true }} fullWidth size="small" />
                        <AutocompleteFieldComponent label="Marital Status (optional)" value={formData.maritalStatus} onChange={val => handleChange('maritalStatus', val)} options={[{ label: "Single", value: "Single" }, { label: "Married", value: "Married" }]} />
                        <AutocompleteFieldComponent label="Gender" value={formData.gender} onChange={val => handleChange('gender', val)} options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]} />
                        <TextFieldComponent label="Nationality" value={formData.nationality} onChange={e => handleChange('nationality', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="PAN Number" value={formData.panNo} onChange={e => handleChange('panNo', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Aadhaar Number" value={formData.aadharNo} onChange={e => handleChange('aadharNo', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Address" value={formData.address} onChange={e => handleChange('address', e.target.value)} fullWidth multiline rows={2} size="small" className="md:col-span-2" />
                        <AutocompleteFieldComponent label="Country" value={formData.country} onChange={val => handleChange('country', val)} options={countries} />
                        <AutocompleteFieldComponent label="State" value={formData.state} onChange={val => handleChange('state', val)} options={states} />
                        <AutocompleteFieldComponent label="City" value={formData.city} onChange={val => handleChange('city', val)} options={districts} />
                        <TextFieldComponent label="Zip code" value={formData.pincode} onChange={e => handleChange('pincode', e.target.value)} fullWidth size="small" />
                        <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                            <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3 }}>Cancel</Button>
                            <Button variant="contained" onClick={() => setTabIndex(1)} sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3 }}>Next</Button>
                        </Box>
                    </form>
                )}

                {tabIndex === 1 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent label="Employee ID" value={formData.employeeId} onChange={e => handleChange('employeeId', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Date of Joining" type="date" value={formData.dateJoined} onChange={e => handleChange('dateJoined', e.target.value)} InputLabelProps={{ shrink: true }} />
                        <TextFieldComponent label="Job Title (optional)" value={formData.jobTitle} onChange={e => handleChange('jobTitle', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Department (optional)" value={formData.department} onChange={e => handleChange('department', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Work Location" value={formData.workLocation} onChange={e => handleChange('workLocation', e.target.value)} fullWidth size="small" className="md:col-span-2" />
                        <AutocompleteFieldComponent label="Contract Type" value={formData.contractType} onChange={val => handleChange('contractType', val)} options={[{ label: "type 1", value: "type 1" }, { label: "type 2", value: "type 2" }, { label: "type 3", value: "type 3" }]} />
                        {formData.contractType?.value === 'type 1' && <TextFieldComponent label="Monthly Salary Amount" value={formData.monthlySalary} onChange={e => handleChange('monthlySalary', e.target.value)} fullWidth size="small" />}
                        <TextFieldComponent label="Payment Cycle" value={formData.paymentCycle} onChange={e => handleChange('paymentCycle', e.target.value)} fullWidth size="small" />
                        <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                            <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3 }}>Cancel</Button>
                            <Button variant="contained" onClick={() => setTabIndex(2)} sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3 }}>Next</Button>
                        </Box>
                    </form>
                )}

                {tabIndex === 2 && (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        <TextFieldComponent label="Name of Account Holder" value={formData.accName} onChange={e => handleChange('accName', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Account Number" value={formData.accNumber} onChange={e => handleChange('accNumber', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="Bank Name" value={formData.bankName} onChange={e => handleChange('bankName', e.target.value)} fullWidth size="small" />
                        <TextFieldComponent label="IFSC Code" value={formData.ifsc} onChange={e => handleChange('ifsc', e.target.value)} fullWidth size="small" />
                        <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                            <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3 }}>Cancel</Button>
                            <Button variant="contained" onClick={handleSubmit} sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3 }}>Submit</Button>
                        </Box>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddEmployees;
