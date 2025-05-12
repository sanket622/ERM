import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Checkbox, FormControlLabel, FormGroup, FormLabel, TextField,
    Box, IconButton,
    Typography
} from '@mui/material';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';

const FilterDialog = ({ open, onClose }) => {

    const [contractTypes, setContractTypes] = useState([]);
    const [paymentCycles, setPaymentCycles] = useState([]);
    const [employmentStatuses, setEmploymentStatuses] = useState([]);

    const handleToggle = (value, selected, setSelected) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 6,
                },
            }} >
            <Box p={3}>
                <DialogTitle sx={{ p: 0, mb: 3, fontSize: 24, fontWeight: 'bold' }}>
                    Filter
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    <Box mb={3}>
                        <FormLabel sx={{ fontSize: 16, fontWeight: 500, color: 'black', mb: 2 }}>
                            Work Location
                        </FormLabel>
                        <TextFieldComponent
                            SelectProps={{
                                native: false,
                                displayEmpty: true,
                                IconComponent: () => (
                                    <Box pr={1}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                ),
                            }}
                            InputProps={{ sx: { borderRadius: 1 } }}
                        />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>Contract Type</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            {[
                                { value: 'type1', label: 'Type 1' },
                                { value: 'type2', label: 'Type 2' },
                                { value: 'type3', label: 'Type 3' },
                            ].map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={contractTypes.includes(option.value)}
                                            onChange={() => handleToggle(option.value, contractTypes, setContractTypes)}
                                            sx={{ color: '', '&.Mui-checked': { color: '#0000FF' } }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>

                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>Payment Cycle</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            {[
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'monthly+variable', label: 'Monthly + Variable' },
                                { value: 'fullyVariable', label: 'Fully Variable' },
                            ].map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={paymentCycles.includes(option.value)}
                                            onChange={() => handleToggle(option.value, paymentCycles, setPaymentCycles)}
                                            sx={{ color: '', '&.Mui-checked': { color: '#0000FF' } }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>

                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>Employment Status</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            {[
                                { value: 'working', label: 'Working' },
                                { value: 'resigned', label: 'Resigned' },
                                { value: 'terminated', label: 'Terminated' },
                                { value: 'onLeave', label: 'On Leave' },
                                { value: 'retired', label: 'Retired' },
                            ].map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={employmentStatuses.includes(option.value)}
                                            onChange={() => handleToggle(option.value, employmentStatuses, setEmploymentStatuses)}
                                            sx={{ color: '', '&.Mui-checked': { color: '#0000FF' } }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    </Box>

                    <Box mb={3} mt={2}>
                        <FormLabel sx={{ fontSize: 16, fontWeight: 500, color: 'black', mb: 1 }}>
                            Last Updated
                        </FormLabel>
                        <TextFieldComponent
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 1 } }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 0, mt: 2 }}>
                    <Box display="flex" width="100%" justifyContent="center" className="gap-6">
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                width: '20%', py: 1.5, color: 'black', borderColor: 'lightgrey', borderRadius: 3,
                                '&:hover': {
                                    borderColor: 'lightgrey',
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: '20%', py: 1.5, backgroundColor: '#0000FF', borderRadius: 3,
                                '&:hover': { backgroundColor: '#0000FF' }
                            }}
                        >
                            Apply
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default FilterDialog;
