import React, { useState } from 'react';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// Note: These are simulated MUI icon components - in a real app you would import from @mui/icons-material
// Since we can't import from @mui/icons-material directly, we'll create simple icon components
// that mimic MUI's appearance

// const KeyboardArrowDown = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={props.size  24} height={props.size  24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
//     <path d="M7 10l5 5 5-5"/>
//   </svg>
// );

// const Visibility = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={props.size  24} height={props.size  24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
//     <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
//     <circle cx="12" cy="12" r="3"/>
//   </svg>
// );

// const VisibilityOff = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={props.size  24} height={props.size  24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
//     <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
//     <circle cx="12" cy="12" r="3"/>
//     <line x1="18" y1="6" x2="6" y2="18"/>
//   </svg>
// );

// Custom TextField component to mimic MUI TextField
const TextField = ({ label, name, type, value, onChange, placeholder, endAdornment }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative w-full">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {endAdornment && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {endAdornment}
                    </div>
                )}
            </div>
        </div>
    );
};

// Custom Select component to mimic MUI Select
const Select = ({ label, name, value, onChange, placeholder, options, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (onOpen) onOpen();
    };

    const handleSelectOption = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div
                    onClick={toggleOpen}
                    className="flex justify-between items-center w-full border border-gray-300 rounded p-2 cursor-pointer bg-white"
                >
                    <span className={value ? "text-gray-900" : "text-gray-500"}>
                        {value ? options.find(opt => opt.value === value)?.label : placeholder}
                    </span>
                    {/* <KeyboardArrowDown size={20} className="text-gray-500" /> */}
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectOption(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function EmailAccessForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roleType: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        roleAccess: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const labelStyle = { color: '#696969', fontSize: '16px', display: 'block', marginBottom: '6px', fontWeight: 500 };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const roleTypeOptions = [
        { value: "admin", label: "Administrator" },
        { value: "manager", label: "Manager" },
        { value: "user", label: "Standard User" }
    ];

    const roleAccessOptions = [
        { value: "full", label: "Full Access" },
        { value: "read", label: "Read Only" },
        { value: "write", label: "Write Only" },
        { value: "limited", label: "Limited Access" }
    ];

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-10">                
                {/* <IconButton
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#313131] ]"
                >
                    <ArrowBackIosNewIcon  />
                    <span className="text-[18px] ml-1 ">Back</span>
                </IconButton> */}               
                <h1 className="text-[32px] font-medium text-[#313131] text-center flex-1">
                    Assign Email Access for Your Team
                </h1>              
                <div className="w-[60px]" /> 
            </div>

            <Box className="space-y-4 mt-10">
                <Box>
                    <label style={labelStyle} htmlFor="roleType">Role Type</label>
                    <TextFieldComponent
                        id="roleType"
                        name="roleType"
                        placeholder="Select your Email type"
                        options={roleTypeOptions}
                        value={formData.roleType}
                        onChange={handleChange}
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="name">Name</label>
                    <TextFieldComponent
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter the Name of the person"
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <TextFieldComponent
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter the Email ID of the person"
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                    <TextFieldComponent
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="password">Create Password</label>
                    <TextFieldComponent
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create your password"
                        InputProps={{
                            style: {
                                backgroundColor: '#fff',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
                    <TextFieldComponent
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter your password"
                        InputProps={{
                            style: {
                                backgroundColor: '#fff',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box>
                    <label style={labelStyle} htmlFor="roleAccess">Role Access</label>
                    <TextFieldComponent
                        id="roleAccess"
                        name="roleAccess"
                        placeholder="Select access you want to give"
                        options={roleAccessOptions}
                        value={formData.roleAccess}
                        onChange={handleChange}
                    />
                </Box>


            </Box>
            <Box className="flex justify-center space-x-4 mt-10">
                <Button variant="contained" fullWidth={false} sx={{ background: '#ffff', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '14px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#fff' } }}>Cancel</Button>
                <Button variant='contained' fullWidth={false} sx={{ background: '#0000FF', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '14px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#0000FF' } }}>Done</Button>

            </Box>

        </div>
    );
}