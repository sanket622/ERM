import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../subcompotents/TextFieldComponent';
import AutocompleteFieldComponent from '../../../subcompotents/AutocompleteFieldComponent';

const AddPayrollDialog = ({ open, onClose, formData = {}, onChange, onSubmit }) => {


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
            <DialogContent className='space-y-4' sx={{ pt: 4, pb: 2 }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Add Current Payroll
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent
                        label="Employee Name"
                        value={formData.employeeName}
                        onChange={onChange('employeeName')}
                    />
                    <TextFieldComponent
                        fullWidth
                        label="Employee ID"
                        variant="outlined"
                        value={formData.employeeId}
                        onChange={onChange('employeeId')}
                    />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent
                        fullWidth
                        label="Custom Employee ID"
                        variant="outlined"
                        value={formData.customEmployeeId} // 🔹 NEW
                        onChange={onChange('customEmployeeId')}
                    />
                    <TextFieldComponent
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        value={formData.phoneNumber}
                        onChange={onChange('phoneNumber')}
                    />
                </Box>

                <Box display="flex" gap={2} mb={2}>
                    <TextFieldComponent
                        fullWidth
                        label="Daily Income"
                        variant="outlined"
                        type="number"
                        value={formData.income || ''}
                        onChange={onChange('income')}
                    />
                    <TextFieldComponent
                        fullWidth
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date ? formData.date.slice(0, 10) : ''} // format YYYY-MM-DD
                        onChange={onChange('date')}
                    />
                </Box>


            </DialogContent>

            <DialogActions sx={{ pr: 4, pb: 3, mt: 4, mb: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        width: '14%',
                        mr: 1,
                        py: 1,
                        color: 'black',
                        borderColor: 'lightgrey',
                        borderRadius: 3,
                        '&:hover': {
                            borderColor: 'lightgrey',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    sx={{
                        width: '14%',
                        py: 1,
                        backgroundColor: '#0000FF',
                        borderRadius: 3,
                        '&:hover': {
                            backgroundColor: '#0000FF',
                        },
                    }}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPayrollDialog;
