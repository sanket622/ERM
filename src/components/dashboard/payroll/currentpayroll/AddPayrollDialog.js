import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddPayrollDialog = ({ open, onClose }) => {
  const [formData, setFormData] = React.useState({
    employeeName: '',
    employeeId: '',
    phoneNumber: '',
    workLocation: '',
    payPeriod: '',
    dailyIncome: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ pt: 4, pb: 2 }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Add Current Payroll
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            label="Employee Name"
            variant="outlined"
            value={formData.employeeName}
            onChange={handleChange('employeeName')}
          />
          <TextField
            fullWidth
            label="Employee ID"
            variant="outlined"
            value={formData.employeeId}
            onChange={handleChange('employeeId')}
          />
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
          />
          <TextField
            fullWidth
            label="Work Location"
            variant="outlined"
            value={formData.workLocation}
            onChange={handleChange('workLocation')}
          />
        </Box>

        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="Pay Period"
            variant="outlined"
            value={formData.payPeriod}
            onChange={handleChange('payPeriod')}
          />
          <Select
            fullWidth
            displayEmpty
            value={formData.dailyIncome}
            onChange={handleChange('dailyIncome')}
            sx={{ height: '56px' }}
          >
            <MenuItem value="" disabled>
              Daily Income
            </MenuItem>
            <MenuItem value="100">100</MenuItem>
            <MenuItem value="200">200</MenuItem>
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ pr: 4, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log(formData);
            onClose();
          }}
          variant="contained"
          sx={{ backgroundColor: '#0000FF', color: '#fff', textTransform: 'none' }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPayrollDialog;
