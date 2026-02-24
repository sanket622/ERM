import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Checkbox, FormControlLabel, FormGroup, Box, Typography, Slider
} from '@mui/material';

const FilterDialog = ({ open, onClose }) => {
    const [contractTypes, setContractTypes] = useState([]);
    const [amountRange, setAmountRange] = useState([0, 1000000]);

    const handleToggle = (value, selected, setSelected) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleAmountChange = (event, newValue) => {
        setAmountRange(newValue);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 6 } }}>
            <Box p={3}>
                <DialogTitle sx={{ p: 0, mb: 1, fontSize: 24, fontWeight: 'bold' }}> Filter </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    {/* Status Section */}
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>Status</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                            {[
                                { value: 'graceperiod', label: 'Grace Period' },
                                { value: 'settled', label: 'Settled' },
                                { value: 'overdue', label: 'Overdue' },
                            ].map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={contractTypes.includes(option.value)}
                                            onChange={() => handleToggle(option.value, contractTypes, setContractTypes)}
                                            sx={{ '&.Mui-checked': { color: '#4B5563' } }}
                                        />    
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    </Box>

                    {/* Amount Slider Section */}
                    <Box sx={{ mt: 4, ml: 2, mr: 2, px:3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Outstanding Amount</Typography>
                        <Slider
                            value={amountRange}
                            onChange={handleAmountChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000000}
                            step={100}
                            sx={{ color: '#4B5563' }}
                        />
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">Min: {amountRange[0]}</Typography>
                            <Typography variant="body2">Max: {amountRange[1]}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 4, ml: 2, mr: 2, px:3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Total Outstanding</Typography>
                        <Slider
                            value={amountRange}
                            onChange={handleAmountChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000000}
                            step={100}
                            sx={{ color: '#4B5563' }}
                        />
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">Min: {amountRange[0]}</Typography>
                            <Typography variant="body2">Max: {amountRange[1]}</Typography>
                        </Box>
                    </Box>
                </DialogContent>

                {/* Actions */}
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
                                width: '20%', py: 1.5, backgroundColor: '#4B5563', borderRadius: 3,
                                '&:hover': { backgroundColor: '#4B5563' }
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
