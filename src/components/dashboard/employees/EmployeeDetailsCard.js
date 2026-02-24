import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const EmployeeDetailsCard = () => {
  const { id } = useParams(); // Get ID from route
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [reason, setReason] = useState('');

  // Fetch employee profile
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://api.earnplus.net/api/v1/employer/auth/getEmployeeProfile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.success) {
          setEmployeeData(response.data.data);
        } else {
          setError('Failed to fetch employee profile');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchEmployeeProfile();
  }, [id]);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFields([]);
    setReason('');
  };

  const handleFieldToggle = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = () => {
    console.log('Requesting change for:', selectedFields, 'Reason:', reason);
    handleClose();
  };

  if (loading) return <div className="p-6"><CircularProgress /></div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!employeeData) return null;

  const details = [
    { label: 'Name', value: employeeData.employeeName },
    { label: 'Employee ID', value: employeeData.employeeId },
    { label: 'Gender', value: employeeData.gender },
    { label: 'Date of Birth', value: new Date(employeeData.dob).toLocaleDateString() },
    { label: 'Phone Number', value: employeeData.mobile },
    { label: 'Nationality', value: employeeData.nationality },
    { label: 'Marital Status', value: employeeData.maritalStatus },
    { label: 'Email ID', value: employeeData.email },
    { label: 'Address', value: employeeData.address },
    { label: 'State', value: employeeData.stateId },
    { label: 'City', value: employeeData.city },
    { label: 'Pincode', value: employeeData.pincode },
    { label: 'Job Title', value: employeeData.EmploymentDetails?.jobTitle || '-' },
    { label: 'Department', value: employeeData.EmploymentDetails?.department || '-' },
    {
      label: 'Date of Joining',
      value: new Date(employeeData.EmploymentDetails?.dateJoined).toLocaleDateString() || '-',
    },
    { label: 'Name of Account Holder', value: employeeData.EmployeeBankDetails?.accName || '-' },
    { label: 'Account Number', value: employeeData.EmployeeBankDetails?.accNumber || '-' },
    { label: 'Bank Name', value: employeeData.EmployeeBankDetails?.bankName || '-' },
    { label: 'IFSC Code', value: employeeData.EmployeeBankDetails?.ifsc || '-' },
  ];

  return (
    <div className="p-6">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Employee Details
      </Typography>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow border p-6">
        <div className="flex justify-end mb-4">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpen}
            sx={{ backgroundColor: '#4B5563', textTransform: 'none', borderRadius: '8px', py: 1, px: 3 }}
          >
            Request Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
          {details.map((item, index) => (
            <div key={index}>
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-black font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className="flex justify-end pr-1 pt-2">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="flex justify-start items-center px-6 pt-0">
          <DialogTitle className="text-xl font-semibold">Select the field you want to edit</DialogTitle>
        </div>
        <DialogContent className="px-6">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {[
              'Name',
              'Gender',
              'Mobile Number',
              'Address',
              'Date of Joining',
              'Employee ID',
              'Contract Type',
              'Bank Details',
              'Payment Cycle',
              'Work location',
            ].map((option, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={selectedFields.includes(option)}
                    onChange={() => handleFieldToggle(option)}
                    sx={{
                      '&.Mui-checked': { color: '#4B5563' },
                    }}
                  />
                }
                label={option}
              />
            ))}
          </div>
          <div className="mt-6">
            <FormLabel sx={{ color: 'black' }} className="text-black font-semibold mb-2 block">
              Reason
            </FormLabel>
            <TextField
              multiline
              minRows={4}
              fullWidth
              placeholder="Write the reason for your request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#4B5563',
              textTransform: 'none',
              borderRadius: '10px',
              px: 4,
              py: 1.5,
              mb: 6,
              mt: 2,
            }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeDetailsCard;
