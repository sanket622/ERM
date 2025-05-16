import React from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../subcompotents/TextFieldComponent';
import AutocompleteFieldComponent from '../../../subcompotents/AutocompleteFieldComponent';

const AddHistoricalPayrollDialog = ({ open, onClose }) => {
    const [formData, setFormData] = React.useState({ employeeName: '', employeeId: '', phoneNumber: '', workLocation: '', payPeriod: '', dailyIncome: '' });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px', } }}>
            <DialogContent className='space-y-4' sx={{ pt: 4, pb: 2, }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Add Historical Payroll
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Form Fields */}
                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent label="Employee Name" value={formData.employeeName} onChange={handleChange('employeeName')} />
                    <TextFieldComponent fullWidth label="Employee ID" variant="outlined" value={formData.employeeId} onChange={handleChange('employeeId')} />

                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent fullWidth label="Phone Number" variant="outlined" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
                    <TextFieldComponent fullWidth label="Work Location" variant="outlined" value={formData.workLocation} onChange={handleChange('workLocation')} />

                </Box>

                <Box display="flex" gap={2}>
                    <AutocompleteFieldComponent label="Contract Type" onChange={handleChange('dailyIncome')} options={[{ label: "100", value: "100" }, { label: "200", value: "200" }]} />
                    <AutocompleteFieldComponent label="Payment Cycle" onChange={handleChange('Income')} options={[{ label: "100", value: "100" }, { label: "200", value: "200" }]} />

                </Box>
                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent label="Date" type="date" InputLabelProps={{ shrink: true }} />
                    <TextFieldComponent label="Income" variant="outlined" value={formData.workLocation} onChange={handleChange('workLocation')} />

                </Box>
            </DialogContent>
            <DialogActions sx={{ pr: 4, pb: 3, mt: 4, mb: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ width: '14%', mr: 1, py: 1, color: 'black', borderColor: 'lightgrey', borderRadius: 3, '&:hover': { borderColor: 'lightgrey', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} >
                    Cancel
                </Button>
                <Button variant="contained" sx={{ width: '14%', py: 1, backgroundColor: '#0000FF', borderRadius: 3, '&:hover': { backgroundColor: '#0000FF' } }} >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddHistoricalPayrollDialog;
