import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Box, Typography } from '@mui/material';


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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 6, }, }} >
            <Box p={3}>
                <DialogTitle sx={{ p: 0, mb: 1, fontSize: 24, fontWeight: 'bold' }}> Filter </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>Mode</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            {[
                                { value: 'lien', label: 'Lien' },
                                { value: 'enach', label: 'E-NACH' },
                                
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
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 0, mt: 4 }}>
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
