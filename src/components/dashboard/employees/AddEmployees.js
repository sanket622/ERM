import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
} from "@mui/material";
import {
  Person,
  AccountBalance,
} from "@mui/icons-material";
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
    <div className="max-w-6xl mx-auto bg-white rounded-xl border p-6 mt-10">
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        className="border-b"
      >
        <Tab icon={<Person />} iconPosition="start" label="Personal Information" />
        <Tab icon={<BusinessCenterOutlinedIcon />} iconPosition="start" label="Employment Details" />
        <Tab icon={<AccountBalance />} iconPosition="start" label="Bank Details" />
      </Tabs>

      {/* PERSONAL INFORMATION */}
      {tabIndex === 0 && (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TextFieldComponent label="First Name" fullWidth size="small" />
          <TextFieldComponent label="Last Name" fullWidth size="small" />
          <TextFieldComponent label="Mobile Number" fullWidth size="small" />
          <TextFieldComponent label="Email Address (optional)" fullWidth size="small" />
          <TextFieldComponent
            label="Date of Birth (optional)"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
          <AutocompleteFieldComponent
            label="Marital Status (optional)"
            value={maritalStatus}
            onChange={setMaritalStatus}
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
            ]}
          />
          <AutocompleteFieldComponent
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
          />
          <AutocompleteFieldComponent
            label="Nationality (optional)"
            value={nationality}
            onChange={setNationality}
            options={[
              { label: "Indian", value: "Indian" },
              { label: "Other", value: "Other" },
            ]}
          />
          <TextField label="PAN Number" fullWidth size="small" />
          <TextField label="Aadhaar Number" fullWidth size="small" />
          <TextField label="Address" fullWidth multiline rows={2} size="small" className="md:col-span-2" />
          <AutocompleteFieldComponent
            label="City"
            value={city}
            onChange={setCity}
            options={[
              { label: "City1", value: "City1" },
              { label: "City2", value: "City2" },
            ]}
          />
          <AutocompleteFieldComponent
            label="State"
            value={state}
            onChange={setState}
            options={[
              { label: "State1", value: "State1" },
              { label: "State2", value: "State2" },
            ]}
          />
          <AutocompleteFieldComponent
            label="ZIP Code"
            value={zipCode}
            onChange={setZipCode}
            options={[
              { label: "123456", value: "123456" },
              { label: "654321", value: "654321" },
            ]}
          />
          <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: "#0000FF" }}>Next</Button>
          </Box>
        </form>
      )}

      {/* EMPLOYMENT DETAILS */}
      {tabIndex === 1 && (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TextField label="Employee ID" fullWidth size="small" />
          <TextField
            label="Date of Joining"
            type="date"
            value={doj}
            onChange={(e) => setDoj(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
          <TextField label="Job Title (optional)" fullWidth size="small" />
          <TextField label="Department (optional)" fullWidth size="small" />
          <TextField label="Work Location" fullWidth size="small" className="md:col-span-2" />
          <TextField label="Contract Type" fullWidth size="small" />
          <TextField label="Payment Cycle" fullWidth size="small" />
          <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: "#0000FF" }}>Next</Button>
          </Box>
        </form>
      )}

      {/* BANK DETAILS */}
      {tabIndex === 2 && (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TextField label="Name of Account Holder" fullWidth size="small" />
          <TextField label="Account Number" fullWidth size="small" />
          <TextField label="Bank Name" fullWidth size="small" />
          <TextField label="IFSC Code" fullWidth size="small" />
          <Box className="flex justify-end col-span-1 md:col-span-2 mt-4 space-x-2">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: "#0000FF" }}>Add</Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default AddEmployees;
