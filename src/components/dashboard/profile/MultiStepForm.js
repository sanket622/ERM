import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, RadioGroup, Typography, Card, IconButton, Checkbox} from '@mui/material';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AutocompleteFieldComponent from '../../subcompotents/AutocompleteFieldComponent';
import { useSnackbar } from 'notistack';

const steps = [
    'Tell Us About Your Organization',
    'Where Is Your Organization Based?',
    'Define Your Company Policies',
    'Provide Details of Your Employees'
];

const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [countries, setCountries] = useState([]);
    const [states1, setStates1] = useState([]);
    const [districts1, setDistricts1] = useState([]);
    const [states2, setStates2] = useState([]);
    const [districts2, setDistricts2] = useState([]);
    const [contractTypes, setContractTypes] = useState([]);
    const [selectedContractTypeIds, setSelectedContractTypeIds] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const handleBack = () => setActiveStep(prev => prev - 1);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleCountryChange = (newValue, step) => {
        const countryId = newValue ? newValue.id : '';
        if (step === 0) {
            setFormData((prev) => ({
                ...prev,
                country: countryId,
                state: '',
                district: '',
            }));
            fetchStates(countryId, 0);
        } else {
            setFormData((prev) => ({
                ...prev,
                country2: countryId,
                state2: '',
                district2: '',
            }));
            fetchStates(countryId, 1);
        }
    };

    const handleStateChange = (newValue, step) => {
        const stateId = newValue ? newValue.id : '';
        if (step === 0) {
            setFormData((prev) => ({
                ...prev,
                state: stateId,
                district: '',
            }));
            fetchDistricts(stateId, 0);
        } else {
            setFormData((prev) => ({
                ...prev,
                state2: stateId,
                district2: '',
            }));
            fetchDistricts(stateId, 1);
        }
    };

    useEffect(() => {
        axios
            .get('https://api.earnplus.net/api/v1/associate/location/getAllCountries', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    const formattedCountries = response.data.data.map((country) => ({
                        id: country.id,
                        label: country.countryName,
                    }));
                    setCountries(formattedCountries);
                }
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const fetchStates = (countryId, step) => {
        axios
            .get(`https://api.earnplus.net/api/v1/associate/location/getStatesByCountry/${countryId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    const formattedStates = response.data.data.map((state) => ({
                        id: state.id,
                        label: state.stateName,
                    }));
                    if (step === 0) {
                        setStates1(formattedStates);
                    } else {
                        setStates2(formattedStates);
                    }
                }
            })
            .catch((error) => {
                console.error(`Error fetching states for step ${step}:`, error);
            });
    };


    const fetchDistricts = (stateId, step) => {
        axios
            .get(`https://api.earnplus.net/api/v1/associate/location/getDistrictsByState/${stateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    const formattedDistricts = response.data.data.map((district) => ({
                        id: district.id,
                        label: district.districtName,
                    }));
                    if (step === 0) {
                        setDistricts1(formattedDistricts);
                    } else {
                        setDistricts2(formattedDistricts);
                    }
                }
            })
            .catch((error) => {
                console.error(`Error fetching districts for step ${step}:`, error);
            });
    };

    useEffect(() => {
        axios.get('https://api.earnplus.net/api/v1/associate/contract/getAllContractTypes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((response) => {
                if (response.data.success) {
                    setContractTypes(response.data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching contract types:', error);
            });
    }, []);

    const toggleContractSelection = (id) => {
        setSelectedContractTypeIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleSubmit = async () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}`, };
        try {
            if (activeStep === 3) {
                const payload = {
                    industryType: formData.industryType,
                    businessLocation: formData.businessLocation,
                    businessDescription: formData.businessDescription,
                    establishmentDate: new Date(formData.establishmentDate).toISOString(),
                    country: formData.country,
                    state: formData.state,
                    district: formData.district,
                    pincode: formData.pincode || '000000',
                };
                await axios.patch('https://api.earnplus.net/api/v1/employer/auth/EmployerProfileCompletion',
                    payload, { headers });
                enqueueSnackbar('Submitted successfully!', { variant: 'success' });
            }
            if (activeStep === 1) {
                const payload = {
                    workspaceName: formData.workspace,
                    noOfEmployees: parseInt(formData.totalEmployees, 10) || 0,
                    address: formData.address,
                    country: formData.country2,
                    state: formData.state2,
                    district: formData.district2,
                };
                await axios.patch('https://api.earnplus.net/api/v1/employer/auth/addEmployerWorkLocation',
                    payload, { headers }
                );
                enqueueSnackbar('Submitted successfully!', { variant: 'success' });
            }

            if (activeStep === 2) {
                const payload = {
                    noticePeriod: parseInt(formData['field-0'], 10),
                    probationPeriod: parseInt(formData['field-1'], 10),
                    annualLeaves: parseInt(formData['field-2'], 10),
                    sickLeaves: parseInt(formData['field-3'], 10),
                    casualLeaves: parseInt(formData['field-4'], 10),
                    maternityLeaves: parseInt(formData['field-5'], 10),
                    overtimePolicy: formData['policy-0'],
                    registrationPolicy: formData['policy-1'],
                    remoteworkPolicy: formData['policy-2'],
                    otherPolicies: formData['policy-3'],
                };
                await axios.patch('https://api.earnplus.net/api/v1/employer/auth/addEmployerCompanyPolicy',
                    payload, { headers });
                enqueueSnackbar('Submitted successfully!', { variant: 'success' });
            }
            if (activeStep === 0) {
                const payload = { contractTypeId: selectedContractTypeIds, };
                await axios.patch('https://api.earnplus.net/api/v1/employer/auth/addEmployerContractType',
                    payload, { headers }
                );
                enqueueSnackbar('Submitted successfully!', { variant: 'success' });
            }
            setActiveStep((prev) => prev + 1);
        } catch (error) {
            console.error('Error submitting step data:', error);
            enqueueSnackbar('Submission failed. Please try again.', { variant: 'error' });
        }
    };

    const renderStepContent = () => {
        const labelStyle = { color: '#696969', fontSize: '16px', display: 'block', marginBottom: '6px', fontWeight: 500 };

        switch (activeStep) {
            case 3:
                return (
                    <Box className="space-y-4 mt-10">
                        <Box><label style={labelStyle} htmlFor="businessName">Business Name</label><TextFieldComponent id="businessName" name="businessName" placeholder="Enter your business name" value={formData.businessName || ''} onChange={e => handleChange('businessName', e.target.value)} /></Box>
                        <Box><label style={labelStyle} htmlFor="industryType">Industry Type</label><TextFieldComponent id="industryType" name="industryType" select options={[{ id: '', name: 'Select industry type', disabled: true }, { id: 'IT', name: 'IT' }, { id: 'Finance', name: 'Finance' }]} value={formData.industryType} onChange={e => handleChange('industryType', e.target.value)} />
                        </Box>
                        <Box><label style={labelStyle} htmlFor="businessLocation">Business Location</label><TextFieldComponent id="businessLocation" name="businessLocation" placeholder="Enter location" value={formData.businessLocation || ''} onChange={e => handleChange('businessLocation', e.target.value)} /></Box>
                        <Box><label style={labelStyle} htmlFor="businessDescription">Business Description</label><TextFieldComponent id="businessDescription" name="businessDescription" placeholder="Describe your business" value={formData.businessDescription || ''} onChange={e => handleChange('businessDescription', e.target.value)} /></Box>
                        <Box><label style={labelStyle} htmlFor="establishmentDate">Establishment Date</label><TextFieldComponent id="establishmentDate" name="establishmentDate" type="date" placeholder="Select date" InputLabelProps={{ shrink: true }} value={formData.establishmentDate || ''} onChange={e => handleChange('establishmentDate', e.target.value)} /></Box>
                        <Box className="grid grid-cols-2 gap-4">
                            <Box><label style={labelStyle} htmlFor="pan">PAN No.</label><TextFieldComponent id="pan" name="pan" placeholder="Enter PAN number" value={formData.pan || ''} onChange={e => handleChange('pan', e.target.value)} /></Box>
                            <Box><label style={labelStyle} htmlFor="gst">GST No.</label><TextFieldComponent id="gst" name="gst" placeholder="Enter GST number" value={formData.gst || ''} onChange={e => handleChange('gst', e.target.value)} /></Box>
                        </Box>
                        <Box className="grid grid-cols-2 gap-4">
                            <Box>
                                <label style={labelStyle} htmlFor="country">Country</label>
                                <AutocompleteFieldComponent
                                    label="Select Country"
                                    options={countries}
                                    value={countries.find((country) => country.id === formData.country) || null}
                                    onChange={(newValue) => handleCountryChange(newValue, 0)}
                                />
                            </Box>
                            <Box>
                                <label style={labelStyle} htmlFor="state">State</label>
                                <AutocompleteFieldComponent
                                    label="Select State"
                                    options={states1}
                                    value={states1.find((state) => state.id === formData.state) || null}
                                    onChange={(newValue) => handleStateChange(newValue, 0)}
                                />
                            </Box>
                            <Box>
                                <label style={labelStyle} htmlFor="district">District</label>
                                <AutocompleteFieldComponent
                                    label="Select District"
                                    options={districts1}
                                    value={districts1.find((district) => district.id === formData.district) || null}
                                    onChange={(newValue) => setFormData((prev) => ({ ...prev, district: newValue ? newValue.id : '' }))}
                                />
                            </Box>
                        </Box>

                    </Box>
                );

            case 1:
                return (
                    <Box className="space-y-4 mt-10">
                        <Box><label style={labelStyle} htmlFor="workspace">Name of Workspace</label><TextFieldComponent id="workspace" name="workspace" placeholder="Enter workspace name" value={formData.workspace || ''} onChange={e => handleChange('workspace', e.target.value)} /></Box>
                        <Box><label style={labelStyle} htmlFor="totalEmployees">Total Employees (optional)</label><TextFieldComponent id="totalEmployees" name="totalEmployees" placeholder="Select range" select options={[{ id: '1-10', name: '1-10' }, { id: '11-50', name: '11-50' }]} value={formData.totalEmployees || ''} onChange={e => handleChange('totalEmployees', e.target.value)} /></Box>
                        <Box><label style={labelStyle} htmlFor="address">Address</label><TextFieldComponent id="address" name="address" placeholder="Enter full address" multiline value={formData.address || ''} onChange={e => handleChange('address', e.target.value)} /></Box>
                        <Box className="grid grid-cols-2 gap-4">
                            <Box>
                                <label style={labelStyle} htmlFor="country2">Country</label>
                                <AutocompleteFieldComponent
                                    label="Select Country"
                                    options={countries}
                                    value={countries.find((country) => country.id === formData.country2) || null}
                                    onChange={(newValue) => handleCountryChange(newValue, 1)}
                                />
                            </Box>

                            <Box>
                                <label style={labelStyle} htmlFor="state2">State</label>
                                <AutocompleteFieldComponent
                                    label="Select State"
                                    options={states2}
                                    value={states2.find((state) => state.id === formData.state2) || null}
                                    onChange={(newValue) => handleStateChange(newValue, 1)}
                                />
                            </Box>

                            <Box>
                                <label style={labelStyle} htmlFor="district2">District</label>
                                <AutocompleteFieldComponent
                                    label="Select District"
                                    options={districts2}
                                    value={districts2.find((district) => district.id === formData.district2) || null}
                                    onChange={(newValue) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            district2: newValue ? newValue.id : '',
                                        }))
                                    }
                                />
                            </Box>
                        </Box>

                        <Box className="text-center"><Button variant='text' color="primary" sx={{ textTransform: 'none' }}>+ Add Location</Button></Box>
                    </Box>
                );

            case 2:
                return (
                    <Box className="space-y-4 mt-10">
                        <Box className="grid grid-cols-2 gap-4">
                            {["Notice Period", "Probation Period Days", "Total Annual Leaves", "Sick Leaves", "Casual Leaves", "Maternity Leaves"].map((label, i) => (
                                <Box key={i}><label style={labelStyle} htmlFor={`field-${i}`}>{label}</label><TextFieldComponent id={`field-${i}`} name={`field-${i}`} placeholder={`Enter ${label.toLowerCase()}`} onChange={e => handleChange(`field-${i}`, e.target.value)} /></Box>
                            ))}
                        </Box>
                        {["Overtime Policy", "Registration Policy", "Remote Work Policy", "Other Policies"].map((label, i) => (
                            <Box key={i}><label style={labelStyle} htmlFor={`policy-${i}`}>{label}</label><TextFieldComponent id={`policy-${i}`} name={`policy-${i}`} placeholder={`Enter ${label.toLowerCase()}`} onChange={e => handleChange(`policy-${i}`, e.target.value)} /></Box>
                        ))}
                    </Box>
                );

            case 0:
                return (
                    <Box className="space-y-4 mt-10">
                        <RadioGroup value="" onChange={() => { }}> {/* Empty just for structure */}
                            <Box className="grid grid-cols-2 gap-4">
                                {contractTypes.map((type) => {
                                    const isSelected = selectedContractTypeIds.includes(type.id);
                                    return (
                                        <Card
                                            key={type.id}
                                            variant="outlined"
                                            sx={{
                                                height: '100%',
                                                minHeight: 200,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 2,
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => toggleContractSelection(type.id)}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: isSelected ? '#4B5563' : '#F2F2F4',
                                                    padding: '12px 16px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography fontWeight="600" sx={{ color: isSelected ? 'white' : 'black' }}>
                                                    {type.name}
                                                </Typography>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => toggleContractSelection(type.id)}
                                                    sx={{
                                                        color: isSelected ? 'white' : 'rgba(0, 0, 0, 0.54)',
                                                        '&.Mui-checked': { color: 'white' },
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </Box>
                                            <Box sx={{ backgroundColor: '#fff', padding: '16px' }}>
                                                <Typography sx={{ fontSize: '14px', color: '#696969' }}>
                                                    {type.description}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    );
                                })}
                            </Box>
                        </RadioGroup>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="h-full my-10">
                {/* Vertical Stepper - Left Side */}
                <Box className="w-1/6 mt-20 flex justify-center items-center fixed  ">
                    <Box className="flex flex-col items-center relative h-[500px] ">
                        {steps.map((step, index) => (
                            <Box key={index} className="flex flex-col items-center">
                                <Box
                                    className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${index <= activeStep ? 'border-2 border-[#4B5563]' : 'border-2 border-gray-300'}`}
                                >
                                    <Box
                                        className={`w-3 h-3 rounded-full ${index <= activeStep ? 'bg-[#4B5563]' : 'bg-gray-300'}`}
                                    />
                                </Box>
                                {index < steps.length - 1 && (
                                    <Box
                                        className={`w-0.5 h-32 ${index < activeStep ? 'bg-[#4B5563]' : 'bg-gray-300'}`}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Form Section - Right Side */}
                <Box className="w-full flex justify-center items-center">
                    <Box className=" w-1/2 max-w-4xl">
                        <Box className="flex items-center ">
                            {activeStep > 0 && (
                                <IconButton onClick={handleBack}>
                                    <ArrowBackIosNewIcon className='text-black' />
                                </IconButton>
                            )}
                            <Typography sx={{ marginLeft: 4 }} variant="h4" className="text-[#313131] "> {steps[activeStep]}  </Typography>
                        </Box>
                        <Box className="mt-4 "> {renderStepContent()}  </Box>
                        <Box className="mt-10 flex justify-center gap-4">
                            {activeStep < steps.length - 1 ? (
                                <Button onClick={handleSubmit} variant="contained" sx={{ background: '#4B5563', color: 'white', px: 6, py: 0.5, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#4B5563' } }}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" sx={{ background: '#4B5563', color: 'white', px: 6, py: 0.5, borderRadius: 2, fontSize: '16px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#4B5563' } }}>
                                    Submit
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default MultiStepForm;
