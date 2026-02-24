import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../../subcompotents/TextFieldComponent';
import { useDispatch } from 'react-redux';
import { createPayrollEntry } from '../../../../redux/historicalpayroll/payrollSlice';
import { useSnackbar } from 'notistack';

const AddHistoricalPayrollDialog = ({ open, onClose, onSuccess, prefillData = {} }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = React.useState({
    startDate: '',
    endDate: '',
    income: ''
  });

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (open) {
      setFormData({
        startDate: '',
        endDate: '',
        income: ''
      });
      setErrors({});
    }
  }, [open]);

  const maxSelectableDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  };

  const validate = () => {
    const newErrors = {};

    if (!prefillData.customEmployeeId) {
      enqueueSnackbar('Employee ID is missing.', { variant: 'error' });
      return false;
    }
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    if (!formData.endDate) newErrors.endDate = 'End Date is required';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End Date cannot be before Start Date';
    }
    if (!formData.income) newErrors.income = 'Income is required';
    else if (isNaN(formData.income) || Number(formData.income) <= 0) {
      newErrors.income = 'Income must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      enqueueSnackbar('Please fix validation errors before submitting.', { variant: 'error' });
      return;
    }
  
    const payload = {
      customEmployeeId: prefillData.customEmployeeId,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      income: Number(formData.income)
    };
  
    try {
      const response = await dispatch(createPayrollEntry(payload)); 
      const data = response?.payload;
  
      if (data?.success) {
        onClose();
        enqueueSnackbar(data?.message || 'Payroll created successfully!', { variant: 'success' });
        onSuccess();
      } else {
       
        enqueueSnackbar(`Failed to add payroll: ${data?.message || 'Unknown error'}`, { variant: 'error' });
      }
    } catch (err) {
      const message = typeof err === 'string' ? err : err?.message || 'Unknown error';
      enqueueSnackbar(`Failed to add payroll: ${message}`, { variant: 'error' });
    }
  };
  

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: undefined });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
      <DialogContent className='space-y-4' sx={{ pt: 4, pb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Add Historical Payroll
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextFieldComponent
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={handleChange('startDate')}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: maxSelectableDate() }}
          error={!!errors.startDate}
          helperText={errors.startDate}
          fullWidth
        />

        <TextFieldComponent
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={handleChange('endDate')}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: maxSelectableDate() }}
          error={!!errors.endDate}
          helperText={errors.endDate}
          fullWidth
        />

        <TextFieldComponent
          label="Income"
          variant="outlined"
          value={formData.income}
          onChange={handleChange('income')}
          error={!!errors.income}
          helperText={errors.income}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pr: 4, pb: 3, mt: 4, mb: 2 }}>
       

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: '14%', py: 1, backgroundColor: '#4B5563', borderRadius: 3, '&:hover': { backgroundColor: '#4B5563' } }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHistoricalPayrollDialog;
