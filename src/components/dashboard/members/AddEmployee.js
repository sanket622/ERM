import { Dialog, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'

const AddEmployee = ({ handleSubmit, open, onClose, formData, setFormData }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#F2F2F2',  // Default border color
            },
            '&:hover fieldset': {
                borderColor: '#F2F2F2',  // Hover state border color
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F2F2F2',  // Focus state border color
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            borderColor: '#F2F2F2',  // Ensuring no color is applied directly here
        },
    };

    return (
        <div>
            <Dialog
                open={open} onClose={onClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '60%',
                        maxWidth: '60%',
                        height: '80%',  
                        maxHeight: '80%',
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: 4,
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                        overflow: 'auto',
                        backgroundColor: '#F2F2F2',
                    },
                }}
            >
                {/* Header with Cancel/Submit */}
                <div className="flex justify-between items-center px-6 pt-2 ">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="text-green-500 hover:text-green-600 font-medium"
                    >
                        Submit
                    </button>
                </div>

                {/* Title */}
                <DialogTitle className="text-center text-xl font-medium pb-4 ">
                    Add Employee
                </DialogTitle>

                <DialogContent>
                    <div className="space-y-0 grid grid-cols-2 gap-4 mt-2  ">
                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-500 mb-2">Name</label>
                            <TextField
                                fullWidth
                                value={formData?.farmerName}
                                onChange={handleInputChange}
                                name="farmerName"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Employee ID */}
                        <div className=''>
                            <label className="block text-gray-500 mb-2">Employee ID</label>
                            <TextField
                                fullWidth
                                value={formData?.employeeId}
                                onChange={handleInputChange}
                                name="employeeId"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-500 mb-2">Email</label>
                            <TextField
                                fullWidth
                                value={formData?.email}
                                onChange={handleInputChange}
                                name="email"
                                required
                                type="email"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Mobile Field */}
                        <div>
                            <label className="block text-gray-500 mb-2">Mobile</label>
                            <TextField
                                fullWidth
                                value={formData?.farmerMobile}
                                onChange={handleInputChange}
                                name="farmerMobile"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-gray-500 mb-2">Designation</label>
                            <TextField
                                fullWidth
                                value={formData?.designation}
                                onChange={handleInputChange}
                                name="designation"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-gray-500 mb-2">Department</label>
                            <TextField
                                fullWidth
                                value={formData?.department}
                                onChange={handleInputChange}
                                name="department"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Date of Birth (DOB) */}
                        <div>
                            <label className="block text-gray-500 mb-2">Date of Birth</label>
                            <TextField
                                fullWidth
                                type="date"
                                value={formData?.dob}
                                onChange={handleInputChange}
                                name="dob"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Date Joined */}
                        <div>
                            <label className="block text-gray-500 mb-2">Date Joined</label>
                            <TextField
                                fullWidth
                                type="date"
                                value={formData?.dateJoined}
                                onChange={handleInputChange}
                                name="dateJoined"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Employment Type */}
                        <div>
                            <label className="block text-gray-500 mb-2">Employment Type</label>
                            <FormControl fullWidth required variant="outlined">

                                <Select
                                    size='small'
                                    value={formData?.employmentType}
                                    onChange={handleInputChange}
                                    name="employmentType"

                                    InputProps={{
                                        style: {
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            borderColor: '#F2F2F2',
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <MenuItem value="SALARIED">Salaried Employee</MenuItem>
                                    <MenuItem value="CONTRACTUAL_FIXED_VARIABLE">Contractual with Fixed & Variable Salary</MenuItem>
                                    <MenuItem value="GIG_WORKER">Gig Worker with Variable Income</MenuItem>

                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-2">Marital Status</label>
                            <FormControl fullWidth required variant="outlined">
                                <Select
                                    size='small'
                                    value={formData?.marital_status}
                                    onChange={handleInputChange}
                                    name="marital_status"
                                    InputProps={{
                                        style: {
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            borderColor: '#F2F2F2',
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Divorced">Divorced</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-2">Gender</label>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    size='small'
                                    value={formData?.gender}
                                    onChange={handleInputChange}
                                    name="gender"
                                    InputProps={{
                                        style: {
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            borderColor: '#F2F2F2',
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Unknown">Unknown</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </div>

                        {/* Payment Cycle */}
                        <div>
                            <label className="block text-gray-500 mb-2">Payment Cycle</label>
                            <TextField
                                fullWidth
                                value={formData?.paymentCycle}
                                onChange={handleInputChange}
                                name="paymentCycle"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-500 mb-2">Address</label>
                            <TextField
                                fullWidth
                                value={formData?.address}
                                onChange={handleInputChange}
                                name="address"
                                required
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        borderColor: '#F2F2F2',
                                    },
                                }}
                                sx={textFieldStyle}
                            />
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddEmployee
