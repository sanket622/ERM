import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stepper, Step, StepLabel, TextField, Button, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useSnackbar } from 'notistack';

const EmployerProfile = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        businessLocation: '',
        businessType: 'Other',
        businessDescription: '',
        establishedDate: '',
        registrationNumber: '',
        gstNumber: '',
        pincode: '',
        emailDetails: [{ email: '', email_type: 'Other' }],
        noticePeriod: 0,
        probationPeriod: 0,
        totalAnnualLeaves: 0,
        sickLeaves: 0,
        maritalStatus: '',
        gender: '',
        totalEmployees: 0,
        workLocation: [{ country: '', state: '', district: '', locationName: '', totalEmployees: 0 }],
        contractType: '',
        paymentType: '',
        paymentCycleDates: [], // Replace with below
        paymentCycles: [], // Each item will be { from: '', to: '' }


    });
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [contracts, setContracts] = useState([]);
    const steps = ['Business Details', 'Company Policies', 'Email Details', 'Work Location', 'Contract Details', 'Payment Details'];

    const { enqueueSnackbar } = useSnackbar();

    const getToken = () => {
        return localStorage.getItem('access_token');
    };

    useEffect(() => {
        const token = getToken();  // Get the token
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('http://64.227.166.238:8090/employer/GetStateCountryDistrict?filter_type=country', config)
            .then(res => setCountries(res.data.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (formData.workCountry) {
            const token = getToken();  // Get the token
            const config = { headers: { Authorization: `Bearer ${token}` } };

            axios.get(`http://64.227.166.238:8090/employer/GetStateCountryDistrict?filter_type=state&country_id=${formData.workCountry}`, config)
                .then(res => setStates(res.data.data))
                .catch(error => console.log(error));
        }
    }, [formData.workCountry]);

    useEffect(() => {
        if (formData.workState) {
            const token = getToken();  // Get the token
            const config = { headers: { Authorization: `Bearer ${token}` } };

            axios.get(`http://64.227.166.238:8090/employer/GetStateCountryDistrict?filter_type=district&state_id=${formData.workState}`, config)
                .then(res => setDistricts(res.data.data))
                .catch(error => console.log(error));
        }
    }, [formData.workState]);

    useEffect(() => {
        const token = getToken();  // Get the token
        const config = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('http://64.227.166.238:8090/employer/AddgetContractbyEmployer', config)
            .then(res => setContracts(res.data.data))
            .catch(error => console.log(error));
    }, []);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;

        if (name === 'paymentCycleCount') {
            const count = parseInt(val, 10);
            const cycles = Array(count).fill('').map((_, i) => formData.paymentCycles[i] || { from: '', to: '' });
        
            setFormData(prev => ({
                ...prev,
                [name]: count,
                paymentCycles: cycles,
            }));
        }
         else {
            setFormData(prev => ({
                ...prev,
                [name]: val,
            }));
        }
    };

    const handlePaymentCycleDateChange = (index, field, value) => {
        const updatedCycles = [...formData.paymentCycles];
        updatedCycles[index] = { ...updatedCycles[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            paymentCycles: updatedCycles,
        }));
    };
    
    // Handle Next button
    const handleNext = () => {
        handleSubmit(); // Submit the data on "Next"
        setActiveStep(prev => prev + 1);
    };

    // Handle Back button
    const handleBack = () => setActiveStep(prev => prev - 1);

    // Submit form data
    const handleSubmit = () => {
        const token = getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = 'http://64.227.166.238:8090/employer/AddEmailContractWorkLocation';

        const data = getRequestData();
        axios.post(apiUrl, data, config)
            .then(() => {
                // Show success notification
                enqueueSnackbar('Data Submitted Successfully!', { variant: 'success' });
            })
            .catch(error => {
                // Show error notification
                enqueueSnackbar('There was an error submitting the form.', { variant: 'error' });
            });
    };

    // Add a new email input field
    const addEmail = () => {
        setFormData(prevData => ({
            ...prevData,
            emailDetails: [...prevData.emailDetails, { email: '', email_type: 'Other' }]
        }));
    };

    // Remove an email input field
    const removeEmail = index => {
        const newEmailDetails = [...formData.emailDetails];
        newEmailDetails.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            emailDetails: newEmailDetails
        }));
    };

    // Add a new work location input field
    const addLocation = () => {
        setFormData(prevData => ({
            ...prevData,
            workLocation: [...prevData.workLocation, { country: '', state: '', district: '', locationName: '', totalEmployees: 0 }]
        }));
    };

    // Remove a work location input field
    const removeLocation = index => {
        const newWorkLocation = [...formData.workLocation];
        newWorkLocation.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            workLocation: newWorkLocation
        }));
    };

    const handleEmailChange = (e, index) => {
        const { name, value } = e.target;
        const newEmailDetails = [...formData.emailDetails];
        newEmailDetails[index] = { ...newEmailDetails[index], [name]: value };
        setFormData(prevData => ({
            ...prevData,
            emailDetails: newEmailDetails
        }));
    };


    const handleLocationChange = (e, index) => {
        const { name, value } = e.target;
        const newWorkLocation = [...formData.workLocation];
        newWorkLocation[index] = { ...newWorkLocation[index], [name]: value };
        setFormData(prevData => ({
            ...prevData,
            workLocation: newWorkLocation
        }));
    };

    // Get relevant data for the active step
    const getRequestData = () => {
        switch (activeStep) {
            case 0: return { filter_type: 'business', business_location: formData.businessLocation, business_type: formData.businessType, business_description: formData.businessDescription, established_date: formData.establishedDate, registration_number: formData.registrationNumber, gst_number: formData.gstNumber, country_id: formData.workCountry, state_id: formData.workState, district_id: formData.workDistrict, pincode: formData.pincode };
            case 1: return { filter_type: 'policy', notice_period_days: formData.noticePeriod, probation_period_days: formData.probationPeriod, total_annual_leaves: formData.totalAnnualLeaves, sick_leaves: formData.sickLeaves };
            case 2: // Email details
                return {
                    filter_type: 'email',
                    email_details: formData.emailDetails // Send all email details as an array
                };

            case 3: // Work Location details
                return {
                    filter_type: 'location',
                    work_location_details: formData.workLocation // Send all work location details as an array
                };
            case 4: return { filter_type: 'contract', contract_under: formData.contractType };
            case 5: return {
                filter_type: 'payment',
                payment_type: formData.paymentType,
                payment_cycle_count: formData.paymentCycleCount,
                payment_cycles: formData.paymentCycles
            };            

            default: return {};
        }
    };

    // Render form based on active step
    const renderForm = () => {
        switch (activeStep) {
            case 0: return (
                <Box>
                    <FormField label="Business Location" name="businessLocation" value={formData.businessLocation} onChange={handleChange} />
                    <Dropdown label="Business Type" name="businessType" value={formData.businessType} onChange={handleChange} options={['Manufacturing', 'Retail', 'Service', 'Agriculture', 'Other']} />
                    <FormField label="Business Description" name="businessDescription" value={formData.businessDescription} onChange={handleChange} multiline />
                    <FormField label="Established Date" name="establishedDate" value={formData.establishedDate} onChange={handleChange} type="date" />
                    <FormField label="Registration Number" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
                    <FormField label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                    <Dropdown label="Country" name="workCountry" value={formData.workCountry} onChange={handleChange} options={countries.map(c => ({ id: c.id, name: c.country }))} />
                    <Dropdown label="State" name="workState" value={formData.workState} onChange={handleChange} options={states.map(s => ({ id: s.id, name: s.state }))} />
                    <Dropdown label="District" name="workDistrict" value={formData.workDistrict} onChange={handleChange} options={districts.map(d => ({ id: d.id, name: d.district }))} />
                    <FormField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                </Box>
            );
            case 1: return (
                <Box>
                    <FormField label="Notice Period (Days)" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} type="number" />
                    <FormField label="Probation Period (Days)" name="probationPeriod" value={formData.probationPeriod} onChange={handleChange} type="number" />
                    <FormField label="Total Annual Leaves" name="totalAnnualLeaves" value={formData.totalAnnualLeaves} onChange={handleChange} type="number" />
                    <FormField label="Sick Leaves" name="sickLeaves" value={formData.sickLeaves} onChange={handleChange} type="number" />
                </Box>
            );
            case 2: return (
                <Box>
                    {formData.emailDetails.map((emailDetail, index) => (
                        <Box key={index} mb={2}>
                            <FormField label="Email" name="email" value={emailDetail.email} onChange={e => handleEmailChange(e, index)} />
                            <Dropdown label="Email Type" name="email_type" value={emailDetail.email_type} onChange={e => handleEmailChange(e, index)} options={['HR', 'Communication', 'Support', 'Finance', 'Other']} />
                            <Button onClick={() => removeEmail(index)} color="error">Remove Email</Button>
                        </Box>
                    ))}

                    <Button onClick={addEmail}>Add Email</Button>
                </Box>
            );
            case 3: return (
                <Box>
                    {formData.workLocation.map((location, index) => (
                        <Box key={index} mb={2}>
                            <FormField label="Location Name" name="locationName" value={location.locationName} onChange={e => handleLocationChange(e, index)} />
                            <Dropdown label="Country" name="country" value={location.country} onChange={e => handleLocationChange(e, index)} options={countries.map(c => ({ id: c.id, name: c.country }))} />
                            <Dropdown label="State" name="state" value={location.state} onChange={e => handleLocationChange(e, index)} options={states.map(s => ({ id: s.id, name: s.state }))} />
                            <Dropdown label="District" name="district" value={location.district} onChange={e => handleLocationChange(e, index)} options={districts.map(d => ({ id: d.id, name: d.district }))} />
                            <FormField label="Total Employees" name="totalEmployees" value={location.totalEmployees} onChange={e => handleLocationChange(e, index)} type="number" />
                            <Button onClick={() => removeLocation(index)} color="error">Remove Location</Button>
                        </Box>
                    ))}

                    <Button onClick={addLocation}>Add Work Location</Button>
                </Box>
            );

            case 4: return (
                <Box>
                    <Dropdown label="Select Contract Type" name="contractType" value={formData.contractType} onChange={handleChange} multiple={true} options={contracts.map(d => ({ id: d.id, name: d.contract_type }))} />
                </Box>
            );
            case 5: return (
                <Box>
                    <Dropdown
                        label="Payment Type"
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        options={['Fixed Monthly', 'Monthly Variable', 'Fully Variable']}
                    />
                    <Dropdown
                        label="Payment Cycle Count"
                        name="paymentCycleCount"
                        value={formData.paymentCycleCount}
                        onChange={handleChange}
                        options={[1, 2, 3, 4, 5]}
                    />
            
                    {formData.paymentCycles.map((cycle, index) => (
                        <Box key={index} mb={3} border={1} borderRadius={2} p={2} borderColor="gray.300">
                            <h4 className="text-lg font-semibold mb-2">{['First', 'Second', 'Third', 'Fourth', 'Fifth'][index]} Cycle</h4>
                            <FormField
                                label="From Date"
                                name="from"
                                type="date"
                                value={cycle.from}
                                onChange={(e) => handlePaymentCycleDateChange(index, 'from', e.target.value)}
                            />
                            <FormField
                                label="To Date"
                                name="to"
                                type="date"
                                value={cycle.to}
                                onChange={(e) => handlePaymentCycleDateChange(index, 'to', e.target.value)}
                            />
                        </Box>
                    ))}
                </Box>
            );
            

            default: return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 ">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>
            <div className="my-6 mt-10">{renderForm()}</div>
            <div className="flex justify-between">
                {activeStep > 0 && <Button variant="contained" color="secondary" onClick={handleBack}>Back</Button>}
                {activeStep < steps.length - 1 ? (
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                )}
            </div>
        </div>
    );
};

const FormField = ({ label, name, value, onChange, type = "text", multiline = false }) => (
    <div className="mb-4">
        <TextField size='small' label={label} name={name} value={value} onChange={onChange} fullWidth variant="outlined" type={type} multiline={multiline} rows={multiline ? 4 : 1} />
    </div>
);

const Dropdown = ({ label, name, value, onChange, options }) => (
    <div className="mb-4">
        <FormControl size='small' fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select label={label} name={name} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.id || option}> {/* Here we are using `option.id` as the value */}
                        {option?.name || option} {/* Make sure to render option.name or option (string) */}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
);

export default EmployerProfile;
