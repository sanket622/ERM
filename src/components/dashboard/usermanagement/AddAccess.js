import React, { useState } from 'react';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import TextFieldComponent from '../../subcompotents/TextFieldComponent';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function EmailAccessForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ roleType: '', name: '', email: '', phoneNumber: '', password: '', confirmPassword: '', roleAccess: '' });
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
                <Box><label style={labelStyle} htmlFor="roleType">Role Type</label><TextFieldComponent id="roleType" name="roleType" placeholder="Select your Email type" options={roleTypeOptions} value={formData.roleType} onChange={handleChange} /></Box>
                <Box><label style={labelStyle} htmlFor="name">Name</label><TextFieldComponent id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter the Name of the person" /></Box>
                <Box><label style={labelStyle} htmlFor="email">Email</label><TextFieldComponent id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter the Email ID of the person" /></Box>
                <Box><label style={labelStyle} htmlFor="phoneNumber">Phone Number</label><TextFieldComponent id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" /></Box>
                <Box><label style={labelStyle} htmlFor="password">Create Password</label><TextFieldComponent id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Create your password" InputProps={{ style: { backgroundColor: '#fff' }, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</IconButton></InputAdornment>) }} /></Box>
                <Box><label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label><TextFieldComponent id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" InputProps={{ style: { backgroundColor: '#fff' }, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">{showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</IconButton></InputAdornment>) }} /></Box>
                <Box><label style={labelStyle} htmlFor="roleAccess">Role Access</label><TextFieldComponent id="roleAccess" name="roleAccess" placeholder="Select access you want to give" options={roleAccessOptions} value={formData.roleAccess} onChange={handleChange} /></Box>
            </Box>

            <Box className="flex justify-center space-x-4 mt-10">
                <Button variant="contained" fullWidth={false} sx={{ background: '#ffff', color: 'black', px: 4, py: 1, borderRadius: 2, fontSize: '14px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#fff' } }}>Cancel</Button>
                <Button variant='contained' fullWidth={false} sx={{ background: '#0000FF', color: 'white', px: 4, py: 1, borderRadius: 2, fontSize: '14px', fontWeight: 500, textTransform: 'none', '&:hover': { background: '#0000FF' } }}>Done</Button>
            </Box>

        </div>
    );
}