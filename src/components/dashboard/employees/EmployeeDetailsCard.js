import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, FormLabel, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';

const EmployeeDetailsCard = () => {
    const [open, setOpen] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [reason, setReason] = useState('');

    const details = [
        { label: 'Name', value: 'Rishab Thakur' },
        { label: 'Employee ID', value: '16AA839' },
        { label: 'Gender', value: 'Male' },
        { label: 'Date of Birth', value: '16/05/1999' },
        { label: 'Phone Number', value: '854618265' },
        { label: 'Nationality', value: 'Indian' },
        { label: 'Marital Status', value: 'Single' },
        { label: 'Email ID', value: 'Rishab123@gmail.com' },
        { label: 'Adhaar Number', value: '204735787' },
        { label: 'Address', value: 'D-16, Near metro station, Saket' },
        { label: 'State', value: 'New Delhi' },
        { label: 'City', value: 'Delhi' },
        { label: 'Pincode', value: '110002' },
        { label: 'Job Title', value: 'Developer' },
        { label: 'Department', value: 'IT' },
        { label: 'Date of Joining', value: '12/01/2023' },
        { label: 'Work Location', value: 'Gurgaon' },
        { label: 'Income receiving Date', value: '1st of every month' },
        { label: 'Contract Type', value: 'Type1' },
        { label: 'Payment Cycle', value: 'Monthly' },
        { label: 'Name of Account Holder', value: 'Rishab Thakur' },
        { label: 'Account Number', value: '123456789' },
        { label: 'Bank Name', value: 'ABC' },
        { label: 'IFSC Code', value: 'ABC12345' },
    ];

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

    return (
        <>
        <div>
            <h1 className="text-[24px] font-semibold mb-4">Employee Details</h1>           
                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow border p-6">
                    <div className="flex justify-end mb-4">
                    <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpen} sx={{ backgroundColor: '#0000FF', textTransform: 'none', borderRadius: '8px', py: 1, px: 3 }}>Request Edit</Button>
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
                    <div className='flex justify-end pr-1'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="flex justify-start items-center px-6 pt-0">
                        <DialogTitle className="text-xl font-semibold">Select the field you want to edit</DialogTitle>
                    </div>
                    <DialogContent className="px-6">
                    <div className="flex flex-wrap gap-x-6 gap-y-4">{['Name', 'Gender', 'Mobile Number', 'Address', 'Date of Joining', 'Employee ID', 'Contract Type', 'Bank Details', 'Payment Cycle', 'Work location'].map((option, idx) => (<FormControlLabel key={idx} control={<Checkbox checked={selectedFields.includes(option)} onChange={() => handleFieldToggle(option)} sx={{ color: '', '&.Mui-checked': { color: '#0000FF' } }} />} label={option} />))}</div>
                        <div className="mt-6">
                            <FormLabel sx={{ color: 'black' }} className="text-black font-semibold mb-2 block">Reason</FormLabel>
                            <TextFieldComponent multiline minRows={4} placeholder="Write the reason for your request" value={reason} onChange={(e) => setReason(e.target.value)} variant="outlined" />
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#0000FF', textTransform: 'none', borderRadius: '10px', px: 4, py: 1.5, mb: 6, mt: 2 }}>Send Request</Button>
                    </DialogActions>
                </Dialog>
                </div>
        </>
    );
};

export default EmployeeDetailsCard;
