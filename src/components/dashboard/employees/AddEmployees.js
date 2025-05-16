import React, { useState } from "react";
import { Tabs, Tab, Button, Box, } from "@mui/material";
import { Person, AccountBalance, } from "@mui/icons-material";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import TextFieldComponent from "../../subcompotents/TextFieldComponent";
import AutocompleteFieldComponent from "../../subcompotents/AutocompleteFieldComponent";

const AddEmployees = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [dob, setDob] = useState("");
    const [doj, setDoj] = useState("");

    // Autocomplete states
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [gender, setGender] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipCode, setZipCode] = useState(null);

    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    return (
        <>
            <div className="max-w-6xl mt-16">
                <p className="text-[24px] font-semibold">Add Employees</p>

                <div className="  bg-white rounded-xl border p-6 mt-6">
                    <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" textColor="inherit" indicatorColor="primary" className="border-b" sx={{ '& .MuiTab-root': { color: '#000' }, '& .Mui-selected': { color: '#0000FF' }, '& .MuiTabs-indicator': { backgroundColor: '#0000FF' } }} >
                        <Tab icon={<Person />} iconPosition="start" label="Personal Information" />
                        <Tab icon={<BusinessCenterOutlinedIcon />} iconPosition="start" label="Employment Details" />
                        <Tab icon={<AccountBalance />} iconPosition="start" label="Bank Details" />
                    </Tabs>

                    {/* PERSONAL INFORMATION */}
                    {tabIndex === 0 && (
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            <TextFieldComponent label="First Name" fullWidth size="small" />
                            <TextFieldComponent label="Last Name" fullWidth size="small" />
                            <TextFieldComponent label="Mobile Number" fullWidth size="small" />
                            <TextFieldComponent label="Email Address (optional)" fullWidth size="small" />
                            <TextFieldComponent label="Date of Birth (optional)" type="date" value={dob} onChange={(e) => setDob(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth size="small" />
                            <AutocompleteFieldComponent label="Marital Status (optional)" value={maritalStatus} onChange={setMaritalStatus} options={[{ label: "Single", value: "Single" }, { label: "Married", value: "Married" }]} />
                            <AutocompleteFieldComponent label="Gender" value={gender} onChange={setGender} options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]} />
                            <AutocompleteFieldComponent label="Nationality (optional)" value={nationality} onChange={setNationality} options={[{ label: "Indian", value: "Indian" }, { label: "Other", value: "Other" }]} />
                            <TextFieldComponent label="PAN Number" fullWidth size="small" />
                            <TextFieldComponent label="Aadhaar Number" fullWidth size="small" />
                            <TextFieldComponent label="Address" fullWidth multiline rows={2} size="small" className="md:col-span-2" />

                            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                                <div className="flex-1"><AutocompleteFieldComponent label="State" value={state} onChange={setState} options={[{ label: "State1", value: "State1" }, { label: "State2", value: "State2" }]} /></div>
                                <div className="flex-1"><AutocompleteFieldComponent label="City" value={city} onChange={setCity} options={[{ label: "City1", value: "City1" }, { label: "City2", value: "City2" }]} /></div>
                                <div className="flex-1"><AutocompleteFieldComponent label="ZIP Code" value={zipCode} onChange={setZipCode} options={[{ label: "123456", value: "123456" }, { label: "654321", value: "654321" }]} /></div>
                            </div>
                            <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                                <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3, '&:hover': { borderColor: 'lightgrey', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                                    Cancel
                                </Button>
                                <Button variant="contained" sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3, '&:hover': { backgroundColor: '#0000FF' } }} >
                                    Next
                                </Button>
                            </Box>
                        </form>
                    )}

                    {/* EMPLOYMENT DETAILS */}
                    {tabIndex === 1 && (
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            <TextFieldComponent label="Employee ID" fullWidth size="small" />
                            <TextFieldComponent label="Date of Joining" type="date" value={doj} onChange={(e) => setDoj(e.target.value)} InputLabelProps={{ shrink: true }} />
                            <TextFieldComponent label="Job Title (optional)" fullWidth size="small" />
                            <TextFieldComponent label="Department (optional)" fullWidth size="small" />
                            <TextFieldComponent label="Work Location" fullWidth size="small" className="md:col-span-2" />
                            <TextFieldComponent label="Contract Type" fullWidth size="small" />
                            <TextFieldComponent label="Payment Cycle" fullWidth size="small" />
                            <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                                <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3, '&:hover': { borderColor: 'lightgrey', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                                    Cancel
                                </Button>
                                <Button variant="contained" sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3, '&:hover': { backgroundColor: '#0000FF' } }} >
                                    Next
                                </Button>
                            </Box>
                        </form>
                    )}

                    {/* BANK DETAILS */}
                    {tabIndex === 2 && (
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            <TextFieldComponent label="Name of Account Holder" fullWidth size="small" />
                            <TextFieldComponent label="Account Number" fullWidth size="small" />
                            <TextFieldComponent label="Bank Name" fullWidth size="small" />
                            <TextFieldComponent label="IFSC Code" fullWidth size="small" />
                            <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
                                <Button variant="outlined" sx={{ width: '10%', py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3, '&:hover': { borderColor: 'lightgrey', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                                    Cancel
                                </Button>
                                <Button variant="contained" sx={{ width: '10%', py: 1, backgroundColor: '#0000FF', borderRadius: 3, '&:hover': { backgroundColor: '#0000FF' } }} >
                                    Next
                                </Button>
                            </Box>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddEmployees;
