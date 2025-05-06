import React, { useState } from 'react';
import { 
  TextField, 
  MenuItem, 
  Button, 
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepConnector 
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Sample data for dropdowns
const industries = [
  "Technology", 
  "Finance", 
  "Healthcare", 
  "Education", 
  "Manufacturing",
  "Retail"
];

const countries = [
  "India", 
  "United States", 
  "United Kingdom", 
  "Canada", 
  "Australia"
];

const states = {
  "India": ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"],
  "United States": ["California", "New York", "Texas", "Florida"]
};

const districts = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"],
  "California": ["Los Angeles", "San Francisco", "San Diego"]
};

function OrganizationForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    industryType: '',
    location: '',
    description: '',
    establishmentDate: '',
    panNo: '',
    gstNo: '',
    country: '',
    state: '',
    district: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleCountryChange = (event) => {
    setFormData({
      ...formData,
      country: event.target.value,
      state: '',
      district: ''
    });
  };

  const handleStateChange = (event) => {
    setFormData({
      ...formData,
      state: event.target.value,
      district: ''
    });
  };

  // Steps for the vertical stepper
  const steps = ['Basic Info', 'Contact Details', 'Documents', 'Review'];
  const activeStep = 0; // First step is active

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16">
      <h1 className="text-3xl font-medium text-center mb-12 text-gray-800">Tell Us About Your Organization</h1>
      
      <div className="flex">
        {/* Custom Stepper */}
        <div className="mr-12 pt-2">
          <div className="flex flex-col items-center h-full">
            <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-600 flex items-center justify-center text-white">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="w-0.5 h-24 bg-gray-300"></div>
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300"></div>
            <div className="w-0.5 h-24 bg-gray-300"></div>
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300"></div>
            <div className="w-0.5 h-24 bg-gray-300"></div>
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300"></div>
          </div>
        </div>
        
        {/* Form */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Business Name</p>
            <TextField
              fullWidth
              placeholder="Enter your name"
              variant="outlined"
              value={formData.businessName}
              onChange={handleChange('businessName')}
              size="medium"
            />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Industry Type</p>
            <TextField
              select
              fullWidth
              placeholder="Select your industry"
              variant="outlined"
              value={formData.industryType}
              onChange={handleChange('industryType')}
              size="medium"
            >
              <MenuItem value="" disabled>Select your industry</MenuItem>
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>{industry}</MenuItem>
              ))}
            </TextField>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Business Location</p>
            <TextField
              fullWidth
              placeholder="Enter your location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange('location')}
              size="medium"
            />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Business Description</p>
            <TextField
              fullWidth
              placeholder="Write the description of your business"
              variant="outlined"
              value={formData.description}
              onChange={handleChange('description')}
              multiline
              rows={2}
              size="medium"
            />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Establishment Date</p>
            <TextField
              fullWidth
              placeholder="dd-mm-yyyy"
              variant="outlined"
              value={formData.establishmentDate}
              onChange={handleChange('establishmentDate')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">PAN No.</p>
              <TextField
                fullWidth
                variant="outlined"
                value={formData.panNo}
                onChange={handleChange('panNo')}
                size="medium"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 mb-2">GST No.</p>
              <TextField
                fullWidth
                variant="outlined"
                value={formData.gstNo}
                onChange={handleChange('gstNo')}
                size="medium"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Country</p>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={formData.country}
              onChange={handleCountryChange}
              size="medium"
            >
              <MenuItem value="" disabled>Select country</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </TextField>
          </div>
          
          <div className="flex gap-4 mb-10">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">State</p>
              <TextField
                select
                fullWidth
                variant="outlined"
                value={formData.state}
                onChange={handleStateChange}
                disabled={!formData.country}
                size="medium"
              >
                <MenuItem value="" disabled>Select state</MenuItem>
                {formData.country && states[formData.country]?.map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 mb-2">District</p>
              <TextField
                select
                fullWidth
                variant="outlined"
                value={formData.district}
                onChange={handleChange('district')}
                disabled={!formData.state}
                size="medium"
              >
                <MenuItem value="" disabled>Select district</MenuItem>
                {formData.state && districts[formData.state]?.map((district) => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="contained" 
              style={{ 
                backgroundColor: '#0000FF', 
                color: 'white',
                borderRadius: '4px',
                padding: '8px 24px',
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationForm;