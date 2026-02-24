import React from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../subcompotents/TextFieldComponent';
import AutocompleteFieldComponent from '../../../subcompotents/AutocompleteFieldComponent';

const AddBasePayrollDialog = ({ open, onClose }) => {
    const [formData, setFormData] = React.useState({ employeeName: '', employeeId: '', phoneNumber: '', workLocation: '', payPeriod: '', dailyIncome: '' });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px', } }}>
            <DialogContent className='space-y-4' sx={{ pt: 4, pb: 2, }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold"> Add Base Payroll   </Typography>
                    <IconButton onClick={onClose}> <CloseIcon /> </IconButton>
                </Box>

                {/* Form Fields */}
                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent label="Employee Name" value={formData.employeeName} onChange={handleChange('employeeName')} />
                    <TextFieldComponent fullWidth label="Employee ID" variant="outlined" value={formData.employeeId} onChange={handleChange('employeeId')} />

                </Box>

                <Box display="flex" gap={2}>
                    <AutocompleteFieldComponent label="Attendance Status" onChange={handleChange('dailyIncome')} options={[{ label: "100", value: "100" }, { label: "200", value: "200" }]} />
                    <TextFieldComponent fullWidth label="Net Salary" variant="outlined" value={formData.employeeId} onChange={handleChange('employeeId')} />
                </Box>

            </DialogContent>
            <DialogActions sx={{ pr: 4, pb: 3, mt: 4, mb: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ width: '14%', mr: 1, py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3, '&:hover': { borderColor: 'lightgrey', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                    Cancel
                </Button>
                <Button variant="contained" sx={{ width: '14%', py: 1, backgroundColor: '#4B5563', borderRadius: 3, '&:hover': { backgroundColor: '#4B5563' } }} >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBasePayrollDialog;
